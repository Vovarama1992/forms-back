import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/PrismaModule/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { OptionDto } from './dto/option.dto';
import { UsersService } from 'src/UserModule/users.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  InputStatisticsDto,
  OptionStatisticsDto,
  TaskStatisticsDto,
} from './dto/statistic.dto';

@Injectable()
export class TaskService {
  private readonly baseUrl: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('BASE_URL') ||
      'https://app.opticard.co/api';
  }

  async createTask(createTaskDto: CreateTaskDto, req: Request) {
    try {
      const user = await this.userService.authenticate(req);
      const creatorId = user.id;
      const { label, description, options, inputs, visible } = createTaskDto;

      const task = await this.prisma.task.create({
        data: {
          label,
          description,
          visible,
          creatorId,
          options: {
            create: options.map((option: OptionDto) => ({
              label: option.label,
              description: option.description,
            })),
          },
          inputs: {
            create: inputs.map((input: string) => ({
              label: input,
            })),
          },
        },
        include: { options: true, inputs: true },
      });

      await Promise.all(
        task.options.map((option) =>
          this.prisma.option.update({
            where: { id: option.id },
            data: {
              imageUrl: `${this.baseUrl}/images/option-image/${task.id}/${option.id}`,
            },
          }),
        ),
      );

      return this.prisma.task.findUnique({
        where: { id: task.id },
        include: { options: true, inputs: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async incrementTaskViews(taskId: number) {
    try {
      return await this.prisma.$transaction(async (prisma) => {
        const currentTask = await prisma.task.findUniqueOrThrow({
          where: { id: taskId },
        });

        return prisma.task.update({
          where: { id: Number(taskId) },
          data: {
            openCount: currentTask.openCount + 1,
          },
        });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTasksByAuthenticatedUser(req: Request) {
    try {
      const user = await this.userService.authenticate(req);
      return await this.prisma.task.findMany({
        where: { creatorId: user.id },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTaskById(id: number) {
    try {
      return await this.prisma.task.findUniqueOrThrow({
        where: { id },
        include: { options: true, inputs: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTaskByLabel(label: string) {
    try {
      const task = await this.prisma.task.findUniqueOrThrow({
        where: { label },
        include: { options: true, inputs: true },
      });

      // Инкрементируем счетчик просмотров
      await this.incrementTaskViews(task.id);

      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTaskStatisticsByLabel(label: string): Promise<TaskStatisticsDto> {
    try {
      const task = await this.prisma.task.findFirstOrThrow({
        where: { label },
        include: {
          options: {
            include: {
              votes: true,
            },
          },
          inputs: {
            include: {
              answers: true,
            },
          },
        },
      });

      const user = await this.prisma.user.findUnique({
        where: { id: task.creatorId },
      });

      const optionsStatistics: OptionStatisticsDto[] = task.options.map(
        (option) => ({
          optionLabel: option.label,
          imageUrl: option.imageUrl,
          votesCount: option.votes.length,
          reasons: option.votes
            .map((vote) => vote.reason)
            .filter((reason): reason is string => Boolean(reason)),
        }),
      );

      const inputsStatistics: InputStatisticsDto[] = task.inputs.map(
        (input) => ({
          inputLabel: input.label,
          answers: input.answers.map((answer) => answer.value),
        }),
      );

      return {
        creatorId: user.id,
        taskDetails: {
          label: task.label,
          description: task.description,
          openCount: task.openCount,
        },
        totalVotes: optionsStatistics.reduce(
          (sum, opt) => sum + opt.votesCount,
          0,
        ),
        optionsStatistics,
        inputsStatistics,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
