import { Injectable } from '@nestjs/common';
import { ActuateMotorDto } from './dto/actuate-motor.dto';
import mqtt from 'mqtt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Esp32Service {
  private client: mqtt.MqttClient;
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.connectMqttBroker();
  }

  async actuateMotor(actuateMotorDto: ActuateMotorDto): Promise<string> {
    const { microcontrollerId, message, isMotorRunning } = actuateMotorDto;
    const data = {
      microcontrollerId,
      message,
      isMotorRunning,
    };
    this.client.publish(`testTopic/${microcontrollerId}`, JSON.stringify(data));
    return 'Actuar Motor - enviado';
  }

  async updateMotorStateDynamoDB() {
    return this.httpService.get('http://localhost:3000/cats');
  }

  private connectMqttBroker() {
    const MQTT_IP = this.configService.get('MQTT_IP');
    const MQTT_USERNAME = this.configService.get('MQTT_USERNAME');
    const MQTT_PASSWORD = this.configService.get('MQTT_PASSWORD');
    this.client = mqtt.connect(MQTT_IP, {
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
    });

    this.client.on('connect', () => {
      console.log('Conexión establecida al broker MQTT');
      this.client.subscribe('testTopic/5fabef6b-9155-4ba9-af59-24467daa5d6a');
    });

    this.client.on('message', function (topic, message) {
      const data = JSON.parse(message.toString());
      console.log(data, 'Mensage-recibido');
    });

    this.client.on('error', function (error) {
      console.error('Error al conectar al servidor MQTT:', error);
    });
  }
}
