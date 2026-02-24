import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { AssistenciaModule } from './modules/assistencia/assistencia.module';

@Module({
  imports: [DatabaseModule, AssistenciaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
