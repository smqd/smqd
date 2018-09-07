import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService, IMqttServiceOptions, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { isString } from 'util';
import { isNull } from '../../../../../../node_modules/@angular/compiler/src/output/output_ast';
import { environment } from '../../../../../environments/environment';

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
  will: FormGroup;
  option: FormGroup;
  sub: FormGroup;
  subList = [];
  subscriptionList = [];
  qosOptions= [0, 1, 2];
  state: boolean;
  viewWill = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.state = false;
    this.will = this.fb.group({
      'topic':[null ,Validators.compose([Validators.pattern('^[a-zA-Z0-9]*[^\+^\#]*[\/a-zA-Z0-9]*$')])],
      'payload': [null],
      'qos':[0],
      'retain': false
    });
    
    var hostname = '127.0.0.1';
    if (environment.production) {
      hostname = location.hostname;
    }
    this.option = this.fb.group({
      'hostname': [hostname, Validators.required],
      'port': [8086, Validators.required],
      'clientId': ['SubClient_' + parseInt((new Date().getTime()).toString().substring(10,12).concat(Math.floor(Math.random() * 100)+'', '0')),
                    Validators.required],
      'will': [null],
      'username': [null],
      'password': [null],
      'path': '/submqtt',
      'reconnectPeriod': false,
      'keepalive': 60
    });
    this.sub = this.fb.group({
      'topic':[null ,Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*[^\#]*[/a-zA-Z0-9]*[^\#]*[/a-zA-Z0-9]*[\/\#]?$')])],
      'qos':[0]
    });
  }

  public connectMqtt(option) {
    if (this.option.invalid) {
      alert("INVALID MQTT CONNECT OPTION")
      return; 
    } 
    if(this.will.controls.topic.value && this.will.controls.payload.value){
      option.will = {
        topic: this.will.controls.topic.value,
        payload: this.will.controls.payload.value,
        qos: parseInt(this.will.controls.qos.value),
        retain: this.will.controls.retain.value
      };
    } else {
      option.will = null;
    }
    this.subClient = new MqttService(option);
    this.subClient.onReconnect.subscribe((message) => {
      //console.log("sub client : retry connect", message);
    });

    this.subClient.onClose.subscribe(() => {
      //console.log("sub client : close");
      this.state = false;
    });

    this.subClient.onConnect.subscribe(() => {
      this.state = true;
      //console.log("sub client : connect");
    });

    this.subClient.onError.subscribe(() => {
      //console.log("sub client : error");
      this.state = false;
      this.subClient = undefined;
      alert('MQTT CONNECT ERROR');
    });
  }

  public disConnectMqtt() {
    this.subList = [];
    this.subscriptionList = [];
    this.subClient.disconnect();
    this.subClient = undefined;
  }

  public subscribe(sub) {
    if (this.sub.invalid) {
      alert("INVALID SUBSCRIBE OPTION")
      return;
    } 
    if(isString(sub.qos)){
      sub.qos = parseInt(sub.qos);
    }
    if(this.subClient == undefined) {
      alert('NOT CONNECT MQTT')
    } else {
      this.subscription = this.subClient.observe(sub.topic,{qos: sub.qos}).subscribe((message: IMqttMessage) => {
        this.message = message.payload.toString();
        this.subList.push({'message': this.message, 'topic': sub.topic, 'qos': sub.qos, 'time': new Date()})
      }, err => {
        alert('SUBSCRIBE ERROR');
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

  public toggle(){
    this.viewWill = !this.viewWill;
  }
}