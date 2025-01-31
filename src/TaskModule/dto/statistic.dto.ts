import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
export class OptionStatisticsDto {
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

  @ApiProperty({
    description: 'Image URL of the option',
    example: 'https://app.opticard.co/api/images/option-image/14/11',
  })
  imageUrl: string;
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
export class InputAnswerDto {
  @ApiProperty({
    description: 'User-provided answer',
    example: 'I prefer organic food',
  })
  inputLabel: string;
}

@ApiExtraModels()
export class InputStatisticsDto {
  @ApiProperty({
    description: 'Label of the input field',
    example: 'Why do you like this product?',
  })
  inputLabel: string;

  @ApiProperty({
    description: 'List of answers for this input',
    type: [String],
  })
  answers: string[];
}

@ApiExtraModels()
export class TaskStatisticsDto {
  @ApiProperty({
    description: 'Statistics of the task options',
    type: [OptionStatisticsDto],
  })
  optionsStatistics: OptionStatisticsDto[];

  @ApiProperty({
    description: 'Statistics of the user inputs',
    type: [InputStatisticsDto],
  })
  inputsStatistics: InputStatisticsDto[];

  @ApiProperty({
    description: 'Creator ID of the task',
    example: 1,
  })
  userId: number;

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
