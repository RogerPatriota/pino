import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiParam, ApiQuery, ApiBody,
} from '@nestjs/swagger';
import { ProdutoService } from '../application/produto.service';
import { CreateProdutoDto } from '../application/dto/create-produto.dto';
import { UpdateProdutoDto } from '../application/dto/update-produto.dto';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly service: ProdutoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar produtos de uma assistência' })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso' })
  findAll(@Query('assistenciaId') assistenciaId: string) {
    return this.service.findAll(assistenciaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo produto (SKU gerado automaticamente: PROD-N)' })
  @ApiBody({ type: CreateProdutoDto })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() dto: CreateProdutoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateProdutoDto })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateProdutoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar produto' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Produto deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
