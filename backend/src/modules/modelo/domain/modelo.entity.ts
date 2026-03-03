type ModeloProps = {
  assistenciaId: string;
  marca: string;
  nomeComercial: string;
  modeloTecnico?: string | null;
  anoLancamento?: number | null;
};

export class Modelo {
  id: string;
  assistenciaId: string;
  marca: string;
  nomeComercial: string;
  modeloTecnico: string | null;
  anoLancamento: number | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ModeloProps) {
    Object.assign(this, props);
    this.nomeComercial = props.nomeComercial.toLowerCase();
  }
}
