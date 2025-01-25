import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/PrismaModule/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { OptionDto } from './dto/option.dto';
import { InputDto } from './dto/input.dto';
import { UsersService } from 'src/UserModule/users.service';
import { Request } from 'express';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, req: Request) {
    const user = await this.userService.authenticate(req);
    const creatorId = user.id;
    const { label, description, options, inputs } = createTaskDto;

    return this.prisma.task.create({
      data: {
        label,
        description,
        creatorId,
        options: {
          create: options.map((option: OptionDto) => ({
            label: option.label,
            description: option.description,
          })),
        },
        inputs: {
          create: inputs.map((input: InputDto) => ({
            label: input.label,
          })),
        },
      },
      include: { options: true, inputs: true },
    });
  }

  async incrementTaskViews(taskId: string) {
    const task = await this.prisma.$transaction(async (prisma) => {
      const currentTask = await prisma.task.findUnique({
        where: { id: Number(taskId) },
      });

      return prisma.task.update({
        where: { id: Number(taskId) },
        data: {
          openCount: currentTask ? currentTask.openCount + 1 : 1,
        },
      });
    });

    return task;
  }

  async getTasksByAuthenticatedUser(req: Request) {
    const user = await this.userService.authenticate(req);
    return this.prisma.task.findMany({
      where: { creatorId: user.id },
    });
  }

  async getTaskById(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      include: { options: true, inputs: true },
    });
  }

  async getTaskByLabel(label: string) {
    const task = await this.prisma.task.findUnique({
      where: { label },
      include: { options: true, inputs: true },
    });

    if (!task) {
      throw new BadRequestException('Задача с таким лейблом не найдена.');
    }

    return task;
  }

  async getTaskStatisticsByLabel(label: string) {
    const task = await this.prisma.task.findFirst({
      where: { label },
      include: { options: true, inputs: true },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const options = await this.prisma.option.findMany({
      where: { taskId: task.id },
      include: {
        votes: true,
      },
    });

    const inputAnswers = await this.prisma.inputAnswer.findMany({
      where: {
        input: {
          taskId: task.id,
        },
      },
    });

    const statistics = {
      totalVotes: options.reduce((sum, option) => sum + option.votes.length, 0),
      totalInputAnswers: inputAnswers.length,
      optionsStatistics: options.map((option) => ({
        optionLabel: option.label,
        votesCount: option.votes.length,
      })),
      taskDetails: {
        label: task.label,
        description: task.description,
        openCount: task.openCount,
      },
    };

    return statistics;
  }
}
