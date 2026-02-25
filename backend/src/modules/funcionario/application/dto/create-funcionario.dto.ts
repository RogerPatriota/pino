import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFuncionarioDto {
  @ApiProperty({ description: 'UUID da assistência', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  assistenciaId: string;

  @ApiProperty({ description: 'Nome do funcionário', example: 'João Silva' })
  nome: string;

  @ApiProperty({ description: 'Email do funcionário', example: 'joao@assistencia.com' })
  email: string;

  @ApiProperty({ description: 'Senha do funcionário', example: 'senhaSegura123' })
  senha: string;

  @ApiPropertyOptional({ description: 'Número de telefone', example: '(11) 98765-4321' })
  numero?: string;

  @ApiPropertyOptional({
    description: 'Cargo do funcionário',
    example: 'tecnico',
    enum: ['dono', 'admin', 'tecnico', 'atendente'],
    default: 'tecnico',
  })
  role?: 'dono' | 'admin' | 'tecnico' | 'atendente';
}
