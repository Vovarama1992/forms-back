import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaModule/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UsersService } from 'src/UserModule/users.service';

@Injectable()
export class VoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async voteForOption(taskId: string, createVoteDto: CreateVoteDto, user: any) {
    const { optionId, reason, inputs } = createVoteDto;

    const vote = await this.prisma.vote.create({
      data: {
        optionId,
        userId: user?.id || null,
        reason,
      },
    });

    if (inputs) {
      for (const [key, value] of Object.entries(inputs)) {
        await this.prisma.inputAnswer.create({
          data: {
            inputId: Number(key),
            userId: user?.id || 1,
            value,
          },
        });
      }
    }

    return vote;
  }
}
