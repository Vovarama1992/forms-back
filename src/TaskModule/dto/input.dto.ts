import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class InputDto {
  @ApiProperty({
    description: 'Label of the input field',
    example: 'Your age',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description: 'ID of the task the input belongs to',
    example: 1,
  })
  @IsInt()
  taskId: number;
}
