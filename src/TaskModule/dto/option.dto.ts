import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class OptionDto {
  @ApiProperty({
    description: 'Label of the option',
    example: 'Option 1',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'Description of the option (optional)',
    example: 'This is the first option.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID of the task the input belongs to',
    example: 1,
  })
  @IsInt()
  taskId: number;
}
