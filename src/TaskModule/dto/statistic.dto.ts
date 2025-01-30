import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
class OptionStatisticsDto {
  @ApiProperty({
    description: 'Label of the option',
    example: 'Perekrestok',
  })
  optionLabel: string;

  @ApiProperty({
    description: 'Number of votes for the option',
    example: 5,
  })
  votesCount: number;

  @ApiProperty({
    description: 'List of reasons provided by users for voting for this option',
    example: ["It's the best choice!", 'I agree with this option'],
  })
  reasons: string[];
}

@ApiExtraModels()
class TaskDetailsDto {
  @ApiProperty({
    description: 'Label of the task',
    example: 'Which product do you like?',
  })
  label: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Select the option you like the most.',
  })
  description: string;

  @ApiProperty({
    description: 'Open count (how many times the task has been viewed)',
    example: 10,
  })
  openCount: number;
}

@ApiExtraModels()
export class TaskStatisticsDto {
  @ApiProperty({
    description: 'Statistics of the task options',
    type: [OptionStatisticsDto],
  })
  optionsStatistics: OptionStatisticsDto[];

  @ApiProperty({
    description: 'Task details object',
    type: TaskDetailsDto,
  })
  taskDetails: TaskDetailsDto;

  @ApiProperty({
    description: 'Total votes across all options',
    example: 15,
  })
  totalVotes: number;
}
