type LogAparelhoProps = {
  assistenciaId: string;
  modeloId: string;
  clienteId: string;
  serialImei: string;
  cor?: string | null;
  observacoesFisicas?: string | null;
  senha?: string | null;
};

export class LogAparelho {
  id: string;
  assistenciaId: string;
  modeloId: string;
  clienteId: string;
  serialImei: string;
  cor: string | null;
  observacoesFisicas: string | null;
  senha: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: LogAparelhoProps) {
    Object.assign(this, props);
  }
}
