import { IsInt, IsString } from 'class-validator';

export class ActuateMotorDto {
  @IsString()
  microcontrollerId: string;

  @IsString()
  message: string;

  @IsInt()
  isMotorRunning: number; // 1 = encendido , 0 = apagado
}
