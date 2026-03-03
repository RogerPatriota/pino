import {
  Controller, Get, Post,
  Body, Query,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiQuery, ApiBody,
} from '@nestjs/swagger';
import { EstoqueService } from '../application/estoque.service';
import { CreateMovimentacaoDto } from '../application/dto/create-movimentacao.dto';

@ApiTags('Estoque')
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly service: EstoqueService) {}

  @Get()
  @ApiOperation({ summary: 'Listar movimentações de uma assistência' })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência' })
  @ApiResponse({ status: 200, description: 'Lista de movimentações retornada com sucesso' })
  listarPorAssistencia(@Query('assistenciaId') assistenciaId: string) {
    return this.service.listarPorAssistencia(assistenciaId);
  }

  @Get('produto')
  @ApiOperation({ summary: 'Listar movimentações de um produto específico' })
  @ApiQuery({ name: 'produtoId', type: String, description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Histórico de movimentações do produto' })
  listarPorProduto(@Query('produtoId') produtoId: string) {
    return this.service.listarPorProduto(produtoId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar movimentação de estoque',
    description: 'Cria a movimentação e atualiza o saldo do produto atomicamente. Imutável: sem DELETE ou UPDATE.',
  })
  @ApiBody({ type: CreateMovimentacaoDto })
  @ApiResponse({ status: 201, description: 'Movimentação registrada e estoque atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos (produto/funcionário/assistência não encontrado, quantidade inválida)' })
  registrar(@Body() dto: CreateMovimentacaoDto) {
    return this.service.registrarMovimentacao(dto);
  }
}
