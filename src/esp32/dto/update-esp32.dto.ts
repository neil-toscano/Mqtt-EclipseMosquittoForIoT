import { PartialType } from '@nestjs/mapped-types';
import { ActuateMotorDto } from './actuate-motor.dto';

export class UpdateEsp32Dto extends PartialType(ActuateMotorDto) {}
