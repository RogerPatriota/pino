import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { AssistenciaModule } from './modules/assistencia/assistencia.module';

@Module({
  imports: [DatabaseModule, AssistenciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
