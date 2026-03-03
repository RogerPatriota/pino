import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClienteDto {
  @ApiPropertyOptional({ description: 'Nome do cliente', example: 'João Silva' })
  nome?: string;

  @ApiPropertyOptional({
    description: 'Número de telefone/WhatsApp (pode conter máscara, será armazenado apenas os dígitos)',
    example: '(11) 98765-4321',
  })
  numero?: string;

  @ApiPropertyOptional({
    description: 'CPF ou CNPJ do cliente (com ou sem formatação)',
    example: '123.456.789-09',
  })
  cpfCnpj?: string;

  @ApiPropertyOptional({ description: 'Endereço do cliente', example: 'Rua das Flores, 123 - São Paulo/SP' })
  endereco?: string;

  @ApiPropertyOptional({ description: 'Observações sobre o cliente', example: 'Cliente VIP' })
  observacoes?: string;
}
