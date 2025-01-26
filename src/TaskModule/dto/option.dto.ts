import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

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
}
