import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService, IMqttServiceOptions, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { isString } from 'util';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {

  
  private subscription: Subscription;
  public message: string;
  public message2: string;

  subClient;
  option: FormGroup;
  sub: FormGroup;
  subList = [];
  subscriptionList = [];

  state: boolean;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.state = false;
    this.option = this.fb.group({
      'host': [null],
      'port': [null],
      'clientId': [null],
      'will': [null],
      'username': [null],
      'password': [null],
      'path': '/submqtt',
      'reconnectPeriod': false
    });
    this.sub = this.fb.group({
      'topic':['/#'],
      'qos':[1]
    });
  }

  public subconnectMqtt(option) {
    console.log(option)
    if (isString(option.will)) {
      option.will = JSON.parse(option.will)
    }
    this.subClient = new MqttService(option);
    this.subClient.onReconnect.subscribe((message) => {
      console.log("sub client : retry connect", message);
    });

    this.subClient.onClose.subscribe(() => {
      console.log("sub client : close");
      this.state = false;
    });

    this.subClient.onConnect.subscribe(() => {
      this.state = true;
      console.log("sub client : connect");
    });

    this.subClient.onError.subscribe(() => {
      console.log("sub client : error");
      this.state = false;
      this.subClient = undefined;
      alert('MQTT CONNECT ERROR')
    });
  }

  public disConnectMqtt() {
    this.subList = [];
    this.subscriptionList = [];
    this.subClient.disconnect();
    this.subClient = undefined;
  }

  public subscribe(sub) {
    if(this.subClient == undefined) {
      alert('NOT CONNECT MQTT')
    } else {
      this.subscription = this.subClient.observe(sub.topic,{qos: sub.qos}).subscribe((message: IMqttMessage) => {
        this.message = message.payload.toString();
        console.log(this.subClient.clientId,this.message, this.subscription)
        this.subList.push({'message': this.message, 'topic': sub.topic, 'qos': sub.qos, 'time': new Date()})
      });
      this.subscriptionList.push({'subscription': this.subscription , 'topic': sub.topic, 'qos': sub.qos, 'time': new Date()})
    }
  }
  
  public unSubscribe(sub, index) {
    sub.unsubscribe();
    this.subscriptionList.splice(index,1)
  }

  public resetList() {
      this.subList = [];
  }

  public ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
      this.subClient.disconnect();
    }
  }
}