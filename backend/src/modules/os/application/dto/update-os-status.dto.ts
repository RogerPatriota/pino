import { ApiProperty } from '@nestjs/swagger';

export class UpdateOsStatusDto {
  @ApiProperty({
    description: 'Novo status da OS',
    enum: ['orcamento', 'aprovado', 'em_manutencao', 'aguardando_peca', 'pronto', 'entregue', 'cancelado'],
    example: 'em_manutencao',
  })
  status: 'orcamento' | 'aprovado' | 'em_manutencao' | 'aguardando_peca' | 'pronto' | 'entregue' | 'cancelado';
}
