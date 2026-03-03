type ServicoProps = {
  assistenciaId: string;
  nome: string;
  descricao?: string | null;
  precoBase?: string | null;
  modeloId?: string | null;
  tempoEstimado?: string | null;
  ativo?: boolean | null;
};

export class Servico {
  id: string;
  assistenciaId: string;
  nome: string;
  descricao: string | null;
  precoBase: string | null;
  modeloId: string | null;
  tempoEstimado: string | null;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ServicoProps) {
    Object.assign(this, props);
    this.ativo = props.ativo ?? true;
  }
}
