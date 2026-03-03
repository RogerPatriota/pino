export type TipoMovimentacao = 'entrada' | 'saida_venda' | 'ajuste_manual' | 'devolucao';

type MovimentacaoProps = {
  assistenciaId: string;
  produtoId: string;
  funcionarioId: string;
  tipo: TipoMovimentacao;
  quantidade: number;
  precoUnidade?: string | null;
  precoCusto?: string | null;
  motivo?: string | null;
};

export class Movimentacao {
  id: string;
  assistenciaId: string;
  produtoId: string;
  funcionarioId: string;
  tipo: TipoMovimentacao;
  quantidade: number;
  precoUnidade: string | null;
  precoCusto: string | null;
  motivo: string | null;
  createdAt: Date;

  constructor(props: MovimentacaoProps) {
    Object.assign(this, props);
  }

  /**
   * Retorna o delta a ser aplicado no estoque.
   * - entrada / devolucao → +|quantidade|
   * - saida_venda          → -|quantidade|
   * - ajuste_manual        → quantidade como está (pode ser negativo)
   */
  get delta(): number {
    switch (this.tipo) {
      case 'entrada':
      case 'devolucao':
        return Math.abs(this.quantidade);
      case 'saida_venda':
        return -Math.abs(this.quantidade);
      case 'ajuste_manual':
        return this.quantidade;
    }
  }
}
