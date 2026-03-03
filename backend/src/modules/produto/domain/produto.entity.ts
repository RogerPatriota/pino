export type CondicaoPeca = 'novo' | 'usado' | 'retirado_original' | 'recondicionado' | 'com_detalhe';

type ProdutoProps = {
  assistenciaId: string;
  categoriaId: string;
  modeloId?: string | null;
  sku?: string | null;
  nomeCustomizado?: string | null;
  marca?: string | null;
  condicao?: CondicaoPeca;
  precoVenda: string;
  quantidadeEstoque?: number;
};

export class Produto {
  id: string;
  assistenciaId: string;
  categoriaId: string;
  modeloId: string | null;
  sku: string | null;
  nomeCustomizado: string | null;
  marca: string | null;
  condicao: CondicaoPeca;
  precoVenda: string;
  quantidadeEstoque: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ProdutoProps) {
    Object.assign(this, props);
    this.condicao = props.condicao ?? 'novo';
    this.quantidadeEstoque = props.quantidadeEstoque ?? 0;
  }
}
