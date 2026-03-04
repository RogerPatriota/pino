export type OsStatus =
  | 'orcamento'
  | 'aprovado'
  | 'em_manutencao'
  | 'aguardando_peca'
  | 'pronto'
  | 'entregue'
  | 'cancelado';

type OrdemServicoProps = {
  assistenciaId: string;
  numeroOs: number;
  clienteId: string;
  aparelhoId: string;
  status?: OsStatus;
  relatoCliente?: string | null;
  laudoTecnico?: string | null;
  observacoesInternas?: string | null;
  funcionarioId?: string | null;
  valorTotal?: string;
  dataInicioReparo?: Date | null;
  dataSaida?: Date | null;
};

export class OrdemServico {
  id: string;
  assistenciaId: string;
  numeroOs: number;
  clienteId: string;
  aparelhoId: string;
  status: OsStatus;
  relatoCliente: string | null;
  laudoTecnico: string | null;
  observacoesInternas: string | null;
  funcionarioId: string | null;
  valorTotal: string;
  dataEntrada: Date;
  dataInicioReparo: Date | null;
  dataSaida: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: OrdemServicoProps) {
    Object.assign(this, props);
    this.status = props.status ?? 'orcamento';
    this.valorTotal = props.valorTotal ?? '0.00';
    this.relatoCliente = props.relatoCliente ?? null;
    this.laudoTecnico = props.laudoTecnico ?? null;
    this.observacoesInternas = props.observacoesInternas ?? null;
    this.funcionarioId = props.funcionarioId ?? null;
    this.dataInicioReparo = props.dataInicioReparo ?? null;
    this.dataSaida = props.dataSaida ?? null;
  }
}
