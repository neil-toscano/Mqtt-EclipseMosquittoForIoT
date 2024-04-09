import { Module } from '@nestjs/common';
import { Esp32Service } from './esp32.service';
import { Esp32Controller } from './esp32.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [Esp32Controller],
  providers: [Esp32Service],
})
export class Esp32Module {}
