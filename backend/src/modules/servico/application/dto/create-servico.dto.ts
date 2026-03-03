import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServicoDto {
  @ApiProperty({ description: 'UUID da assistência', example: '550e8400-e29b-41d4-a716-446655440000' })
  assistenciaId: string;

  @ApiProperty({ description: 'Nome do serviço', example: 'Troca de tela' })
  nome: string;

  @ApiPropertyOptional({ description: 'Descrição do serviço', example: 'Troca completa do display' })
  descricao?: string;

  @ApiPropertyOptional({ description: 'Preço base do serviço', example: '150.00' })
  precoBase?: string;

  @ApiPropertyOptional({ description: 'UUID do modelo associado' })
  modeloId?: string;

  @ApiPropertyOptional({ description: 'Tempo estimado para o serviço (em minutos)', example: 30 })
  tempoEstimado?: number;

  @ApiPropertyOptional({ description: 'Serviço ativo', example: true, default: true })
  ativo?: boolean;
}
