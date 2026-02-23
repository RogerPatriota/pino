import { Injectable } from '@nestjs/common';
import { Assistencia } from '../domain/assistencia.entity';
import { IAssistenciaRepository } from '../domain/assistencia.repository.interface';
import { CreateAssistenciaDto } from './dto/create-assistencia.dto';
import { UpdateAssistenciaDto } from './dto/update-assistencia.dto';

@Injectable()
export class AssistenciaService {
  constructor(private readonly repository: IAssistenciaRepository) {}

  findAll(): Promise<Assistencia[]> {
    return this.repository.findAll();
  }

  findById(id: string): Promise<Assistencia | null> {
    return this.repository.findById(id);
  }

  create(data: CreateAssistenciaDto): Promise<Assistencia> {
    return this.repository.create(data);
  }

  update(id: string, data: UpdateAssistenciaDto): Promise<Assistencia> {
    return this.repository.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
