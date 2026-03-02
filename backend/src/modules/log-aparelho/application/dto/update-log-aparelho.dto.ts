import { PartialType } from '@nestjs/swagger';
import { CreateLogAparelhoDto } from './create-log-aparelho.dto';

export class UpdateLogAparelhoDto extends PartialType(CreateLogAparelhoDto) {}
