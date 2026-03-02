import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModeloDto {
  @ApiProperty({ description: 'Marca do aparelho', example: 'Samsung' })
  marca: string;

  @ApiProperty({ description: 'Nome comercial do modelo (será salvo em minúsculo)', example: 'Galaxy S24 Ultra' })
  nomeComercial: string;

  @ApiPropertyOptional({ description: 'Modelo técnico / número do modelo', example: 'SM-S928B' })
  modeloTecnico?: string;

  @ApiPropertyOptional({ description: 'Ano de lançamento', example: 2024 })
  anoLancamento?: number;
}
