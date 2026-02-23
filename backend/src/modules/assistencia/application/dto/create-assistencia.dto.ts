type AssistenciaConfig = {
  iaAtiva: boolean;
  notificarClienteAutomaticamente: boolean;
};

export class CreateAssistenciaDto {
  nome: string;
  telefone: string;
  logoUrl?: string;
  cnpj?: string;
  endereco?: string;
  promptCustomizado?: string;
  especialidades?: string[];
  configuracoes?: AssistenciaConfig;
}
