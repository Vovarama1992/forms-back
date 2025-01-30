import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteDto {
  @ApiProperty({
    description: 'ID выбранной опции',
    example: 8,
  })
  optionId: number;

  @ApiProperty({
    description: 'Причина выбора (необязательное поле)',
    example: 'Полезно',
    required: false,
  })
  reason?: string;

  @ApiProperty({
    description: 'Ответы на дополнительные вопросы',
    type: 'object',
    additionalProperties: {
      type: 'string',
    },
    example: {
      '8': 'Да',
      '9': 'Иван',
    },
  })
  inputs?: Record<string, string>;
}
