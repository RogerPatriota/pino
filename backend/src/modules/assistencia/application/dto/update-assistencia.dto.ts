import { PartialType } from '@nestjs/swagger';
import { CreateAssistenciaDto } from './create-assistencia.dto';

export class UpdateAssistenciaDto extends PartialType(CreateAssistenciaDto) {}
