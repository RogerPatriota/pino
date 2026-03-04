type OsProdutoProps = {
  osId: string;
  produtoId: string;
  precoVenda: string;
  quantidade: number;
};

export class OsProduto {
  id: string;
  osId: string;
  produtoId: string;
  precoVenda: string;
  quantidade: number;
  createdAt: Date;

  constructor(props: OsProdutoProps) {
    Object.assign(this, props);
  }
}
