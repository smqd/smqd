import { Injectable } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { isString } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MqttMessageService {
  
  mqttService;
  state: boolean;

  constructor() { }

  connectMqtt(option) {
    if (isString(option.will)) {
      option.will = JSON.parse(option.will)
    }
    this.mqttService = new MqttService(option);
    this.mqttService.onReconnect.subscribe((message) => {
      console.log("sub client : retry connect", message);
    });

    this.mqttService.onClose.subscribe(() => {
      console.log("sub client : close");
      this.state = false;
    });

    this.mqttService.onConnect.subscribe(() => {
      this.state = true;
      console.log("sub client : connect");
    });

    this.mqttService.onError.subscribe(() => {
      console.log("sub client : error");
      this.state = false;
      this.mqttService = undefined;
      alert('MQTT CONNECT ERROR')
    });
    return this.mqttService;
  }

  public disConnectMqtt() {
    console.log('mqtt disconnect');
    this.mqttService.disconnect();
    this.mqttService = undefined;
  }
  
  public unsubscribe(sub) {
    console.log('mqtt unsubscribe');
    sub.unsubscribe();
  }

}
