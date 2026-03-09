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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ModeloService } from '../application/modelo.service';
import { CreateModeloDto } from '../application/dto/create-modelo.dto';
import { UpdateModeloDto } from '../application/dto/update-modelo.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Modelos')
@UseGuards(AuthGuard('jwt'))
@Controller('modelos')
export class ModeloController {
  constructor(private readonly service: ModeloService) {}

  @Get()
  @ApiOperation({ summary: 'Listar modelos de uma assistência' })
  @ApiResponse({ status: 200, description: 'Lista de modelos retornada com sucesso' })
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.assistenciaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar modelo por ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do modelo' })
  @ApiResponse({ status: 200, description: 'Modelo encontrado' })
  @ApiResponse({ status: 404, description: 'Modelo não encontrado' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo modelo' })
  @ApiBody({ type: CreateModeloDto })
  @ApiResponse({ status: 201, description: 'Modelo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() dto: CreateModeloDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar modelo' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do modelo' })
  @ApiBody({ type: UpdateModeloDto })
  @ApiResponse({ status: 200, description: 'Modelo atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Modelo não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateModeloDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar modelo' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do modelo' })
  @ApiResponse({ status: 204, description: 'Modelo deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Modelo não encontrado' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
