import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ description: 'UUID da assistência', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  assistenciaId: string;

  @ApiProperty({ description: 'Nome do cliente', example: 'João Silva' })
  nome: string;

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
