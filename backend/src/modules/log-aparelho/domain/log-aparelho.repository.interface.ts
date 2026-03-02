import { LogAparelho } from './log-aparelho.entity';

export abstract class ILogAparelhoRepository {
  abstract findAllByAssistencia(assistenciaId: string): Promise<LogAparelho[]>;
  abstract findById(id: string): Promise<LogAparelho | null>;
  abstract create(entity: Partial<LogAparelho>): Promise<LogAparelho>;
  abstract update(id: string, entity: Partial<LogAparelho>): Promise<LogAparelho>;
  abstract delete(id: string): Promise<void>;
}
