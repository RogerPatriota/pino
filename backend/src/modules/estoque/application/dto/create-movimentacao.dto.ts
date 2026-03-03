import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovimentacaoDto {
  @ApiProperty({ description: 'UUID da assistência (multi-tenant)', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  assistenciaId: string;

  @ApiProperty({ description: 'UUID do produto', example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  produtoId: string;

  @ApiProperty({ description: 'UUID do funcionário responsável', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
  funcionarioId: string;

  @ApiProperty({
    description: [
      'Tipo da movimentação:',
      '• entrada → adiciona ao estoque',
      '• saida_venda → subtrai do estoque',
      '• devolucao → adiciona ao estoque',
      '• ajuste_manual → quantidade com sinal: positivo adiciona, negativo subtrai',
    ].join('\n'),
    enum: ['entrada', 'saida_venda', 'ajuste_manual', 'devolucao'],
    example: 'entrada',
  })
  tipo: 'entrada' | 'saida_venda' | 'ajuste_manual' | 'devolucao';

  @ApiProperty({
    description: 'Quantidade. Para ajuste_manual pode ser negativo. Para demais tipos, sempre positivo.',
    example: 10,
  })
  quantidade: number;

  @ApiPropertyOptional({
    description: 'Preço de custo unitário (obrigatório para tipo entrada). O precoCusto total será calculado automaticamente: precoUnidade × quantidade.',
    example: '120.00',
  })
  precoUnidade?: string;

  @ApiPropertyOptional({ description: 'Motivo / observação da movimentação', example: 'Compra do fornecedor XYZ' })
  motivo?: string;
}
