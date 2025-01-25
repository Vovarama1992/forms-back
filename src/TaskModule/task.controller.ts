import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  //UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
//import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { Request } from 'express';
import { TaskStatisticsDto } from './dto/statistic.dto';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
//@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiBody({ type: CreateTaskDto })
  createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.createTask(createTaskDto, req);
  }

  @Patch(':taskId/increment-views')
  @ApiOperation({ summary: 'Increment view count for a task' })
  @ApiResponse({
    status: 200,
    description: 'Task view count has been successfully incremented.',
  })
  async incrementViews(@Param('taskId') taskId: string) {
    return this.taskService.incrementTaskViews(taskId);
  }

  @Get('by-id/:id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully retrieved.',
    type: TaskDto,
  })
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(Number(id));
  }

  @Get('my-tasks')
  @ApiOperation({ summary: 'Get all tasks created by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Tasks retrieved successfully.',
    type: [TaskDto],
  })
  async getMyTasks(@Req() req: Request) {
    return this.taskService.getTasksByAuthenticatedUser(req);
  }

  @Get('by-label/:label')
  @ApiOperation({ summary: 'Get a task by label' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully retrieved.',
    type: TaskDto,
  })
  getTaskByLabel(@Param('label') label: string) {
    return this.taskService.getTaskByLabel(label);
  }

  @Get('statistics/:label')
  @ApiOperation({ summary: 'Get statistics of a task by label' })
  @ApiResponse({
    status: 200,
    description: 'Statistics of the task retrieved successfully.',
    type: TaskStatisticsDto,
  })
  async getTaskStatisticsByLabel(@Param('label') label: string) {
    return this.taskService.getTaskStatisticsByLabel(label);
  }
}
