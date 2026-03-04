import { Module } from '@nestjs/common';
import { IOsRepository } from './domain/os.repository.interface';
import { OsPostgresRepository } from './infra/os.postgres.repository';
import { OsService } from './application/os.service';
import { OsController } from './interface/os.controller';
import { EstoqueModule } from '../estoque/estoque.module';

@Module({
  imports: [EstoqueModule],
  controllers: [OsController],
  providers: [
    {
      provide: IOsRepository,
      useClass: OsPostgresRepository,
    },
    OsService,
  ],
})
export class OsModule {}
