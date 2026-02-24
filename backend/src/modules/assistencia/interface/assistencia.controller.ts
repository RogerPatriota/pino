import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AssistenciaService } from '../application/assistencia.service';
import { CreateAssistenciaDto } from '../application/dto/create-assistencia.dto';
import { UpdateAssistenciaDto } from '../application/dto/update-assistencia.dto';

@ApiTags('Assistências')
@Controller('assistencias')
export class AssistenciaController {
  constructor(private readonly service: AssistenciaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as assistências' })
  @ApiResponse({ status: 200, description: 'Lista de assistências retornada com sucesso' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar assistência por ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID da assistência' })
  @ApiResponse({ status: 200, description: 'Assistência encontrada' })
  @ApiResponse({ status: 404, description: 'Assistência não encontrada' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova assistência' })
  @ApiBody({ type: CreateAssistenciaDto })
  @ApiResponse({ status: 201, description: 'Assistência criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos (ex: CNPJ inválido)' })
  create(@Body() dto: CreateAssistenciaDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar assistência' })
  @ApiParam({ name: 'id', type: String, description: 'UUID da assistência' })
  @ApiBody({ type: UpdateAssistenciaDto })
  @ApiResponse({ status: 200, description: 'Assistência atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Assistência não encontrada' })
  update(@Param('id') id: string, @Body() dto: UpdateAssistenciaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar assistência' })
  @ApiParam({ name: 'id', type: String, description: 'UUID da assistência' })
  @ApiResponse({ status: 204, description: 'Assistência deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Assistência não encontrada' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
