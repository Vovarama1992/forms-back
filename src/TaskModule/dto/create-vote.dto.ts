import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty({
    description: 'ID of the option the user is voting for',
    example: 1,
  })
  @IsInt()
  optionId: number;

  @ApiProperty({
    description: 'ID of the user who is voting',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Reason why the user chose this option',
    example: 'I like this product more because of its design.',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({
    description: 'Additional input values, e.g., age, gender',
    example: { age: 25, gender: 'Male' },
    required: false,
  })
  @IsOptional()
  @IsString()
  inputs?: Record<string, string>;
}
