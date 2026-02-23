type AssistenciaConfig = {
  iaAtiva: boolean;
  notificarClienteAutomaticamente: boolean;
};

export class Assistencia {
  id: string;
  nome: string;
  logoUrl?: string | null;
  cnpj?: string | null;
  telefone: string;
  endereco?: string | null;
  promptCustomizado?: string | null;
  especialidades?: string[];
  configuracoes?: AssistenciaConfig;
  createdAt: Date;
  updatedAt: Date;
}
