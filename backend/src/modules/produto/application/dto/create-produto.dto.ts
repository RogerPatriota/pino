import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({ description: 'UUID da assistência', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  assistenciaId: string;

  @ApiProperty({ description: 'UUID da categoria do produto', example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  categoriaId: string;

  @ApiPropertyOptional({ description: 'UUID do modelo vinculado', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
  modeloId?: string;

  @ApiPropertyOptional({ description: 'Nome customizado do produto', example: 'Tela iPhone 13 Pro Genérica' })
  nomeCustomizado?: string;

  @ApiPropertyOptional({ description: 'Marca do produto', example: 'Apple' })
  marca?: string;

  @ApiPropertyOptional({
    description: 'Condição da peça',
    enum: ['novo', 'usado', 'retirado_original', 'recondicionado', 'com_detalhe'],
    default: 'novo',
    example: 'novo',
  })
  condicao?: 'novo' | 'usado' | 'retirado_original' | 'recondicionado' | 'com_detalhe';

  @ApiProperty({ description: 'Preço de venda', example: '299.90' })
  precoVenda: string;

  @ApiPropertyOptional({ description: 'Quantidade em estoque', example: 5, default: 0 })
  quantidadeEstoque?: number;
}
