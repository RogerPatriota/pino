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
import { FuncionarioService } from '../application/funcionario.service';
import { CreateFuncionarioDto } from '../application/dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from '../application/dto/update-funcionario.dto';

@ApiTags('Funcionários')
@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly service: FuncionarioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar funcionários de uma assistência' })
  @ApiQuery({ name: 'assistenciaId', type: String, description: 'UUID da assistência' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários retornada com sucesso' })
  findAll(@Query('assistenciaId') assistenciaId: string) {
    return this.service.findAll(assistenciaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar funcionário por ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo funcionário' })
  @ApiBody({ type: CreateFuncionarioDto })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos (ex: email já cadastrado)' })
  create(@Body() dto: CreateFuncionarioDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar funcionário' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do funcionário' })
  @ApiBody({ type: UpdateFuncionarioDto })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateFuncionarioDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar funcionário' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do funcionário' })
  @ApiResponse({ status: 204, description: 'Funcionário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
