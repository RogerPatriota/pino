import { Assistencia } from './assistencia.entity';
import { CreateAssistenciaDto } from '../application/dto/create-assistencia.dto';
import { UpdateAssistenciaDto } from '../application/dto/update-assistencia.dto';

export abstract class IAssistenciaRepository {
  abstract findAll(): Promise<Assistencia[]>;
  abstract findById(id: string): Promise<Assistencia | null>;
  abstract create(data: CreateAssistenciaDto): Promise<Assistencia>;
  abstract update(id: string, data: UpdateAssistenciaDto): Promise<Assistencia>;
  abstract delete(id: string): Promise<void>;
}
