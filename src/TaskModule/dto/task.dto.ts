import { ApiProperty } from '@nestjs/swagger';
import { Task as PrismaTask } from '@prisma/client';

export class TaskDto implements PrismaTask {
  @ApiProperty({
    description: 'ID of the task',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Creator ID of the task',
    example: 1,
  })
  creatorId: number;

  @ApiProperty({
    description: 'Label of the task',
    example: 'What is your favorite color?',
  })
  label: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Please select your favorite color from the options below.',
  })
  description: string;

  @ApiProperty({
    description: 'Open count (how many times the task has been viewed)',
    example: 10,
  })
  openCount: number;

  @ApiProperty({
    description: 'Timestamp when the task was created',
    example: '2025-01-25T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the task was last updated',
    example: '2025-01-25T00:00:00.000Z',
  })
  updatedAt: Date;
}
