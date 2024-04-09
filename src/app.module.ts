import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Esp32Module } from './esp32/esp32.module';

@Module({
  imports: [Esp32Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
