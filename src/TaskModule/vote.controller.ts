import { Controller, Post, Body, Param, Req } from '@nestjs/common';
import { VoteService } from './vote.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Request } from 'express';
import { UsersService } from 'src/UserModule/users.service';

@Controller('tasks/:taskId/vote')
@ApiTags('vote')
export class VoteController {
  constructor(
    private readonly voteService: VoteService,
    private readonly usersService: UsersService,
  ) {}

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
    @Req() req: Request,
  ) {
    const token = req.headers.authorization?.split(' ')[1];

    let user = null;
    if (token) {
      try {
        user = await this.usersService.authenticate(req);
      } catch (error) {
        user = null;
      }
    }

    return this.voteService.voteForOption(taskId, createVoteDto, user);
  }
}
