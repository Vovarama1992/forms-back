import { Controller, Post, Body, Param } from '@nestjs/common';
import { VoteService } from './vote.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVoteDto } from './dto/create-vote.dto';
//import { JwtAuthGuard } from 'guards/jwt-auth.guard';

@Controller('tasks/:taskId/vote')
//@UseGuards(JwtAuthGuard)
@ApiTags('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @ApiOperation({ summary: 'Vote for an option in a task and fill inputs' })
  @ApiResponse({
    status: 201,
    description: 'Vote has been successfully casted.',
  })
  @ApiBody({ type: CreateVoteDto })
  async vote(
    @Param('taskId') taskId: string,
    @Body() createVoteDto: CreateVoteDto,
  ) {
    return this.voteService.voteForOption(taskId, createVoteDto);
  }
}
