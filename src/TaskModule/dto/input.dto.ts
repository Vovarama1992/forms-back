import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InputDto {
  @ApiProperty({
    description: 'Label of the input field',
    example: 'Your age',
  })
  @IsString()
  label: string;
}
