import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OsProdutoInputDto {
  @ApiProperty({ description: 'UUID do produto', example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  produtoId: string;

  @ApiProperty({ description: 'Quantidade do produto na OS', example: 2 })
  quantidade: number;
}

export class OsServicoInputDto {
  @ApiProperty({ description: 'UUID do serviço', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
  servicoId: string;

  @ApiProperty({ description: 'Quantidade/vezes do serviço na OS', example: 1 })
  quantidade: number;
}

export class CreateOsDto {
  @ApiProperty({ description: 'UUID da assistência (multi-tenant)', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  assistenciaId: string;

  @ApiProperty({ description: 'UUID do cliente', example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  clienteId: string;

  @ApiProperty({ description: 'UUID do log de aparelho', example: 'c3d4e5f6-a7b8-9012-cdef-123456789012' })
  aparelhoId: string;

  @ApiPropertyOptional({ description: 'UUID do funcionário responsável', example: 'd4e5f6a7-b8c9-0123-defa-234567890123' })
  funcionarioId?: string;

  @ApiPropertyOptional({ description: 'Relato do cliente sobre o problema', example: 'Tela não liga' })
  relatoCliente?: string;

  @ApiPropertyOptional({ description: 'Laudo técnico do reparo', example: 'Troca de display necessária' })
  laudoTecnico?: string;

  @ApiPropertyOptional({ description: 'Observações internas da assistência', example: 'Cliente prefere peça original' })
  observacoesInternas?: string;

  @ApiPropertyOptional({
    description: 'Produtos a serem adicionados na OS (preço congelado no momento da inserção)',
    type: [OsProdutoInputDto],
  })
  produtos?: OsProdutoInputDto[];

  @ApiPropertyOptional({
    description: 'Serviços a serem adicionados na OS (preço congelado no momento da inserção)',
    type: [OsServicoInputDto],
  })
  servicos?: OsServicoInputDto[];
}
