import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
class OptionStatisticsDto {
  @ApiProperty({
    description: 'ID of the option',
    example: 1,
  })
  optionId: number;

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
class InputAnswerStatisticsDto {
  @ApiProperty({
    description: 'ID of the input',
    example: 1,
  })
  inputId: number;

  @ApiProperty({
    description: 'Number of answers for the input',
    example: 3,
  })
  answersCount: number;

  @ApiProperty({
    description: 'List of values provided by users for this input',
    example: ['Answer 1', 'Answer 2'],
  })
  values: string[];
}

@ApiExtraModels()
export class TaskStatisticsDto {
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

  @ApiProperty({
    description: 'Statistics of the task options',
    type: [OptionStatisticsDto],
  })
  optionsStatistics: OptionStatisticsDto[];

  @ApiProperty({
    description: 'Statistics of the task inputs',
    type: [InputAnswerStatisticsDto],
  })
  inputsStatistics: InputAnswerStatisticsDto[];
}
