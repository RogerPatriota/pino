import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ServicoService } from '../application/servico.service';
import { CreateServicoDto } from '../application/dto/create-servico.dto';
import { UpdateServicoDto } from '../application/dto/update-servico.dto';

@ApiTags('Serviços')
@Controller('servicos')
export class ServicoController {
  constructor(private readonly service: ServicoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar serviços de uma assistência' })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência' })
  @ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso' })
  findAll(@Query('assistenciaId') assistenciaId: string) {
    return this.service.findAll(assistenciaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar serviço por ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do serviço' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo serviço' })
  @ApiBody({ type: CreateServicoDto })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() dto: CreateServicoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar serviço' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do serviço' })
  @ApiBody({ type: UpdateServicoDto })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateServicoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar serviço' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do serviço' })
  @ApiResponse({ status: 204, description: 'Serviço deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
