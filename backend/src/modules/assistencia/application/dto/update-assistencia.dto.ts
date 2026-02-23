import { CreateAssistenciaDto } from './create-assistencia.dto';

export class UpdateAssistenciaDto implements Partial<CreateAssistenciaDto> {
  nome?: string;
  telefone?: string;
  logoUrl?: string;
  cnpj?: string;
  endereco?: string;
  promptCustomizado?: string;
  especialidades?: string[];
  configuracoes?: {
    iaAtiva: boolean;
    notificarClienteAutomaticamente: boolean;
  };
}
