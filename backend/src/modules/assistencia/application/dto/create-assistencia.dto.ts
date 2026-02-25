import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class AssistenciaConfigDto {
  @ApiProperty({ description: 'Se a IA está ativa', example: true })
  iaAtiva: boolean;

  @ApiProperty({ description: 'Notificar cliente automaticamente', example: true })
  notificarClienteAutomaticamente: boolean;
}

export class CreateAssistenciaDto {
  @ApiProperty({ description: 'Nome da assistência', example: 'RS Cell Assistência' })
  nome: string;

  @ApiProperty({ description: 'Telefone de contato', example: '(11) 98765-4321' })
  telefone: string;

  @ApiPropertyOptional({ description: 'URL do logo', example: 'https://exemplo.com/logo.png' })
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'CNPJ da assistência', example: '78.342.703/0001-95' })
  cnpj?: string;

  @ApiPropertyOptional({ description: 'Endereço completo', example: 'Rua das Palmeiras, 123 - São Paulo, SP' })
  endereco?: string;

  @ApiPropertyOptional({ description: 'Prompt customizado para IA' })
  promptCustomizado?: string;

  @ApiPropertyOptional({ description: 'Especialidades da assistência', example: ['iPhone', 'Samsung'], type: [String] })
  especialidades?: string[];

  @ApiPropertyOptional({ description: 'Configurações da assistência', type: AssistenciaConfigDto })
  configuracoes?: AssistenciaConfigDto;
}
