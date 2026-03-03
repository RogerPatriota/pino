import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiParam, ApiQuery, ApiBody,
} from '@nestjs/swagger';
import { CategoriaService } from '../application/categoria.service';
import { CreateCategoriaDto } from '../application/dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../application/dto/update-categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly service: CategoriaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar categorias de uma assistência' })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência' })
  @ApiResponse({ status: 200, description: 'Lista de categorias retornada com sucesso' })
  findAll(@Query('assistenciaId') assistenciaId: string) {
    return this.service.findAll(assistenciaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Categoria encontrada' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova categoria' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() dto: CreateCategoriaDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoriaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar categoria' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Categoria deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
