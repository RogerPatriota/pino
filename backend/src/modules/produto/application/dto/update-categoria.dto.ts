import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoriaDto {
  @ApiPropertyOptional({ description: 'Nome da categoria', example: 'Telas' })
  nome?: string;

  @ApiPropertyOptional({ description: 'Descrição da categoria', example: 'Telas e displays' })
  descricao?: string;

  @ApiPropertyOptional({ description: 'Exige modelo vinculado para uso?', example: true })
  exigeModelo?: boolean;

  @ApiPropertyOptional({ description: 'Tipo da categoria', enum: ['peça', 'acessorio'], example: 'peça' })
  tipo?: 'peça' | 'acessorio';
}
