import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService, IMqttServiceOptions, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { isString } from 'util';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit, OnDestroy {
  public message: string;
  public message2: string;

  pubClient;
  option: FormGroup;
  sub: FormGroup;
  subList = [];
  subscriptionList = [];
  pub: FormGroup;
  pubList = [];

  state: boolean;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.state = false;
    this.option = this.fb.group({
      'host': ['127.0.0.1'],
      'port': [8086],
      'clientId': ['PubClient_' + parseInt((new Date().getTime()).toString().substring(10,12).concat(Math.floor(Math.random() * 100)+'', '0'))],
      'will': [null],
      'username': [null],
      'password': [null],
      'path': '/mqtt',
      'reconnectPeriod': false
    });
    this.pub = this.fb.group({
      'topic':[null],
      'message':[null],
      'qos':[0],
      'retain': [false]
    })
  }

  public connectMqtt(option) {
    if (isString(option.will)) {
      option.will = JSON.parse(option.will)
    }
    this.pubClient = new MqttService(option);
    this.pubClient.onReconnect.subscribe((message) => {
      console.log("pub client : retry connect", message);
    });

    this.pubClient.onClose.subscribe(() => {
      console.log("pub client : close");
      this.state = false;
    });

    this.pubClient.onConnect.subscribe(() => {
      this.state = true;
      console.log("pub client : connect");
    });

    this.pubClient.onError.subscribe(() => {
      console.log("pub client : error");
      this.state = false;
      this.pubClient = undefined;
      alert('MQTT CONNECT ERROR')
    });
  }

  public disConnectMqtt() {
    this.pubList = [];
    this.pubClient.disconnect();
    this.pubClient = undefined;
  }

  public unsafePublish(pub): void {
    if( this.pubClient == undefined) {
      alert('NOT CONNECT MQTT')
    } else {
      this.pubClient.unsafePublish(pub.topic, pub.message, {qos: pub.qos, retain: pub.retain});
      this.pubList.push({'message': pub.message,	'topic': pub.topic,	'qos': pub.qos,	'time': new Date()})
    }
  }

  public resetList() {
    this.pubList = [];
  }

  public ngOnDestroy() {
    if( this.pubClient) {
      this.pubClient.disconnect();
    }
  }
}
