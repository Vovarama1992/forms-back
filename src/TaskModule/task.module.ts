import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/PrismaModule/prisma.module';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { UsersModule } from 'src/UserModule/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, UsersModule, JwtModule],
  controllers: [TaskController, VoteController],
  providers: [TaskService, VoteService],
})
export class TaskModule {}
