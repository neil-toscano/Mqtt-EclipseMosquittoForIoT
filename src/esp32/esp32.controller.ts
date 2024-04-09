import { Controller, Post, Body } from '@nestjs/common';
import { Esp32Service } from './esp32.service';
import { ActuateMotorDto } from './dto/actuate-motor.dto';

@Controller('esp32')
export class Esp32Controller {
  constructor(private readonly esp32Service: Esp32Service) {}

  @Post()
  actuateMotor(@Body() actuateMotorDto: ActuateMotorDto) {
    return this.esp32Service.actuateMotor(actuateMotorDto);
  }
}
