import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/PrismaModule/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VoteService {
  constructor(private readonly prisma: PrismaService) {}

  async voteForOption(taskId: string, createVoteDto: CreateVoteDto) {
    const { optionId, reason, inputs } = createVoteDto;

    const vote = await this.prisma.vote.create({
      data: {
        optionId,
        userId: 1,
        reason,
      },
    });

    if (inputs) {
      for (const [key, value] of Object.entries(inputs)) {
        await this.prisma.inputAnswer.create({
          data: {
            inputId: Number(key),
            userId: 1,
            value,
          },
        });
      }
    }

    return vote;
  }
}
