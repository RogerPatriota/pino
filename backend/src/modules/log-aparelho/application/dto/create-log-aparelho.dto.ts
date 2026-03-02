import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLogAparelhoDto {
  @ApiProperty({ description: 'UUID da assistência', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  assistenciaId: string;

  @ApiProperty({ description: 'UUID do modelo', example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  modeloId: string;

  @ApiProperty({ description: 'UUID do cliente', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
  clienteId: string;

  @ApiProperty({ description: 'Serial ou IMEI do aparelho', example: '356938035643809' })
  serialImei: string;

  @ApiPropertyOptional({ description: 'Cor do aparelho', example: 'Preto' })
  cor?: string;

  @ApiPropertyOptional({ description: 'Observações sobre estado físico', example: 'Tela trincada no canto superior' })
  observacoesFisicas?: string;

  @ApiPropertyOptional({ description: 'Senha do aparelho', example: '1234' })
  senha?: string;
}
