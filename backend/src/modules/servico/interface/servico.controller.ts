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
import { ServicoService } from '../application/servico.service';
import { CreateServicoDto } from '../application/dto/create-servico.dto';
import { UpdateServicoDto } from '../application/dto/update-servico.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Serviços')
@UseGuards(AuthGuard('jwt'))
@Controller('servicos')
export class ServicoController {
  constructor(private readonly service: ServicoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar serviços de uma assistência' })
  @ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso' })
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.assistenciaId);
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
