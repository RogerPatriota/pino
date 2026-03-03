export type CategoriaTipo = 'peça' | 'acessorio';

type CategoriaProps = {
  assistenciaId: string;
  nome: string;
  descricao?: string | null;
  exigeModelo?: boolean | null;
  tipo?: CategoriaTipo;
};

export class Categoria {
  id: string;
  assistenciaId: string;
  nome: string;
  descricao: string | null;
  exigeModelo: boolean;
  tipo: CategoriaTipo;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: CategoriaProps) {
    Object.assign(this, props);
    this.tipo = props.tipo ?? 'peça';
    this.exigeModelo = props.exigeModelo ?? false;
  }
}
