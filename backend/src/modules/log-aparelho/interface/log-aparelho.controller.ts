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
import { LogAparelhoService } from '../application/log-aparelho.service';
import { CreateLogAparelhoDto } from '../application/dto/create-log-aparelho.dto';
import { UpdateLogAparelhoDto } from '../application/dto/update-log-aparelho.dto';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';

@ApiBearerAuth()
@ApiTags('Log Aparelhos')
@UseGuards(AuthGuard('jwt'))
@Controller('log-aparelhos')
export class LogAparelhoController {
  constructor(private readonly service: LogAparelhoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar aparelhos de uma assistência' })
  @ApiResponse({ status: 200, description: 'Lista de aparelhos retornada com sucesso' })
  findAll(@CurrentUser() user: any) {
    return this.service.findAllByAssistencia(user.assistenciaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar aparelho por ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do aparelho' })
  @ApiResponse({ status: 200, description: 'Aparelho encontrado' })
  @ApiResponse({ status: 404, description: 'Aparelho não encontrado' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar novo aparelho' })
  @ApiBody({ type: CreateLogAparelhoDto })
  @ApiResponse({ status: 201, description: 'Aparelho registrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() dto: CreateLogAparelhoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar aparelho' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do aparelho' })
  @ApiBody({ type: UpdateLogAparelhoDto })
  @ApiResponse({ status: 200, description: 'Aparelho atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Aparelho não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateLogAparelhoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar aparelho' })
  @ApiParam({ name: 'id', type: String, description: 'UUID do aparelho' })
  @ApiResponse({ status: 204, description: 'Aparelho deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Aparelho não encontrado' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
