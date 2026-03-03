import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProdutoDto {
  @ApiPropertyOptional({ description: 'UUID da categoria do produto' })
  categoriaId?: string;

  @ApiPropertyOptional({ description: 'UUID do modelo vinculado' })
  modeloId?: string;

  @ApiPropertyOptional({ description: 'Nome customizado do produto', example: 'Tela iPhone 13 Pro Genérica' })
  nomeCustomizado?: string;

  @ApiPropertyOptional({ description: 'Marca do produto', example: 'Apple' })
  marca?: string;

  @ApiPropertyOptional({
    description: 'Condição da peça',
    enum: ['novo', 'usado', 'retirado_original', 'recondicionado', 'com_detalhe'],
  })
  condicao?: 'novo' | 'usado' | 'retirado_original' | 'recondicionado' | 'com_detalhe';

  @ApiPropertyOptional({ description: 'Preço de venda', example: '299.90' })
  precoVenda?: string;

  @ApiPropertyOptional({ description: 'Quantidade em estoque', example: 5 })
  quantidadeEstoque?: number;
}
