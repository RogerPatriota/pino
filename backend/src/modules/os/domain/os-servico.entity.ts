type OsServicoProps = {
  osId: string;
  servicoId: string;
  valorCobrado: string;
  quantidade: number;
};

export class OsServico {
  id: string;
  osId: string;
  servicoId: string;
  valorCobrado: string;
  quantidade: number;
  createdAt: Date;

  constructor(props: OsServicoProps) {
    Object.assign(this, props);
  }
}
