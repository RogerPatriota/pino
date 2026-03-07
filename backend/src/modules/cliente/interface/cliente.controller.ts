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
} from '@nestjs/swagger';
import { ClienteService } from '../application/cliente.service';
import { CreateClienteDto } from '../application/dto/create-cliente.dto';
import { UpdateClienteDto } from '../application/dto/update-cliente.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';

@ApiTags('Clientes')
@UseGuards(AuthGuard('jwt'))
@Controller('clientes')
export class ClienteController {
  constructor(private readonly service: ClienteService) {}

  @Get()
  @ApiOperation({ summary: 'Listar clientes de uma assistência' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso' })
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.assistenciaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do cliente' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo cliente' })
  @ApiBody({ type: CreateClienteDto })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos (CPF/CNPJ inválido, número ou CPF/CNPJ duplicado)' })
  create(@Body() dto: CreateClienteDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do cliente' })
  @ApiBody({ type: UpdateClienteDto })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar cliente' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do cliente' })
  @ApiResponse({ status: 204, description: 'Cliente deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
