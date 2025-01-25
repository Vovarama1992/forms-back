import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { OptionDto } from './option.dto';
import { InputDto } from './input.dto';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Label of the task',
    example: 'Which product do you like?',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'Description of the task',
    example: 'Select the option you like the most.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'List of options for the task',
    type: [OptionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];

  @ApiProperty({
    description: 'List of inputs for the task',
    type: [InputDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InputDto)
  inputs: InputDto[];

  @ApiProperty({
    description: 'ID of the creator of the task',
    example: 1,
  })
  @IsInt()
  creatorId: number;
}
