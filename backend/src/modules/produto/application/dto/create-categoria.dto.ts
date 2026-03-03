import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ description: 'UUID da assistência', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  assistenciaId: string;

  @ApiProperty({ description: 'Nome da categoria', example: 'Telas' })
  nome: string;

  @ApiPropertyOptional({ description: 'Descrição da categoria', example: 'Telas e displays' })
  descricao?: string;

  @ApiPropertyOptional({ description: 'Exige modelo vinculado para uso?', example: true, default: false })
  exigeModelo?: boolean;

  @ApiPropertyOptional({
    description: 'Tipo da categoria',
    enum: ['peça', 'acessorio'],
    default: 'peça',
    example: 'peça',
  })
  tipo?: 'peça' | 'acessorio';
}
