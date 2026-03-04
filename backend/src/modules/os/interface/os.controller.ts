import {
  Controller, Get, Post, Patch,
  Param, Body, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiParam, ApiQuery, ApiBody,
} from '@nestjs/swagger';
import { OsService } from '../application/os.service';
import { CreateOsDto } from '../application/dto/create-os.dto';
import { UpdateOsStatusDto } from '../application/dto/update-os-status.dto';

@ApiTags('Ordens de Serviço')
@Controller('os')
export class OsController {
  constructor(private readonly service: OsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar OSs de uma assistência com filtros opcionais' })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência (obrigatório)' })
  @ApiQuery({ name: 'status', required: false, enum: ['orcamento', 'aprovado', 'em_manutencao', 'aguardando_peca', 'pronto', 'entregue', 'cancelado'] })
  @ApiQuery({ name: 'clienteId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Lista de OSs retornada com sucesso' })
  findAll(
    @Query('assistenciaId') assistenciaId: string,
    @Query('status') status?: string,
    @Query('clienteId') clienteId?: string,
  ) {
    return this.service.findAll(assistenciaId, { status, clienteId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar OS por ID com produtos e serviços incluídos' })
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência (multi-tenant)' })
  @ApiResponse({ status: 200, description: 'OS encontrada com array de produtos e serviços' })
  @ApiResponse({ status: 404, description: 'OS não encontrada' })
  findById(
    @Param('id') id: string,
    @Query('assistenciaId') assistenciaId: string,
  ) {
    return this.service.findById(id, assistenciaId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar OS (número gerado automaticamente: OS-NNN)',
    description:
      'Cria a OS, gera o número sequencial, insere produtos/serviços com preço congelado e abate estoque. Operação 100% atômica.',
  })
  @ApiBody({ type: CreateOsDto })
  @ApiResponse({ status: 201, description: 'OS criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos (cliente, aparelho, produto ou serviço não encontrado)' })
  create(@Body() dto: CreateOsDto) {
    return this.service.create(dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status da OS' })
  @ApiParam({ name: 'id', type: String, description: 'UUID da OS' })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência (multi-tenant)' })
  @ApiBody({ type: UpdateOsStatusDto })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'OS não encontrada' })
  updateStatus(
    @Param('id') id: string,
    @Query('assistenciaId') assistenciaId: string,
    @Body() dto: UpdateOsStatusDto,
  ) {
    return this.service.updateStatus(id, assistenciaId, dto);
  }
}
