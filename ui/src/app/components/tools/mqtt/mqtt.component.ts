import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService, IMqttServiceOptions, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.scss']
})
export class MqttComponent  { //implements OnInit, OnDestroy

  
  // private subscription: Subscription;
  // private subscription2: Subscription;
  // public message: string;
  // public message2: string;

  // option: FormGroup;
  // sub: FormGroup;
  // subList = [];
  // subscriptionList = [];
  // pub: FormGroup;
  // pubList = [];

  // state: boolean;
  
  // constructor(private _mqttService: MqttService, private fb: FormBuilder) {
  //   const mqttOption : IMqttServiceOptions = {
  //     hostname: '127.0.0.1',
  //     port: 9001,
  //     path: '/mqtt2',
  //     clientId: 'my-client-id',
  //     will: {topic:'/test', payload:'will message', qos: 1, retain:true},
  //     username : 'woojoo2',
  //     password : 'woojoo2',
  //   }

  //   const client = new MqttService(mqttOption);
  //    this.subscription2 = client.observe('/test', {qos: 1}).subscribe((message: IMqttMessage) => {
  //      this.message2 = message.payload.toString();
  //      console.log(client.clientId, this.message2)
  //    });
  //    client.unsafePublish('/test', 'hellow world', {qos: 1, retain: true});

  //   //_mqttService.connect(mqttOption)
  //   // this.subscription = this._mqttService.observe('/test', {qos: 1}).subscribe((message: IMqttMessage) => {
  //   //   this.message = message.payload.toString();
  //   //   console.log(this._mqttService.clientId,this.message)
  //   // });
  //   // this.unsafePublish('/test', 'hellow world')
  //   this._mqttService.onReconnect.subscribe((message) => {
  //     console.log("onReconnect", message);
  //   });

  //   this._mqttService.onClose.subscribe(() => {
  //     console.log("onClose");
  //     this.state = false;
  //   });

  //   this._mqttService.onConnect.subscribe(() => {
  //     this.state = true;
  //     console.log("onConnect1");
  //   });

  //   this._mqttService.onError.subscribe(() => {
  //     console.log("onError");
  //     this.state = false;
  //     alert('MQTT CONNECT ERROR')
  //   });


  // }

  // ngOnInit() {
  //   this.state = false;
  //   this.option = this.fb.group({
  //     // 'host': [null, [Validators.required]],
  //     // 'port': [null, [Validators.required]],
  //     // 'clientId': [null, [Validators.required]],
  //     // 'will': [null],
  //     // 'username': [null],
  //     // 'password': [null],
  //     // 'path': '/mqtt',
  //     // 'reconnectPeriod': false
  //     'host': ['127.0.0.1', [Validators.required]],
  //     'port': [8086, [Validators.required]],
  //     'clientId': ['testClient', [Validators.required]],
  //     'will': [{"topic":"/test","payload":"testClient is down","qos": 1,"retain":true}],
  //     'username': ['woojoo'],
  //     'password': ['woojoo'],
  //     'path': '/mqtt',
  //   });
  //   this.sub = this.fb.group({
  //     // 'topic':[null],
  //     // 'qos':[null]
  //     'topic':['/test'],
  //     'qos':[1]
  //   });
  //   this.pub = this.fb.group({
  //     // 'topic':[null],
  //     // 'message':[null],
  //     // 'qos':[null],
  //     // 'retain': [null]
  //     'topic':['/test'],
  //     'message':['testClient message'],
  //     'qos':[1],
  //     'retain': [true]
  //   })
  // }

  // public connectMqtt(option) {
  //   // if(this.option.controls['host'].errors.required) {
  //   //   alert ('host is null');
  //   //   return;
  //   // }
  //   // if(this.option.controls['port'].errors.required) {
  //   //   alert ('port is null');
  //   //   return;
  //   // }
  //   // if(this.option.controls['clientId'].errors.required) {
  //   //   alert ('clientId is null');
  //   //   return;
  //   // }
  //   this._mqttService.connect(option);
  // }

  // public disConnectMqtt() {
  //   this._mqttService.disconnect();
  // }

  // public subscribe(sub) {

  //   //if(this.dupSubscribeCheck(sub).length == 0) {
  //     this.subscription = this._mqttService.observe(sub.topic,{qos: sub.qos}).subscribe((message: IMqttMessage) => {
  //       this.message = message.payload.toString();
  //       console.log(this._mqttService.clientId,this.message, this.subscription)
  //       this.subList.push({'message': this.message, 'topic': sub.topic, 'qos': sub.qos, 'time': new Date()})
  //     });
  //     this.subscriptionList.push({'subscription': this.subscription , 'topic': sub.topic, 'qos': sub.qos, 'time': new Date()})
  //   // } else {
  //   //   console.log("alredy subscibe topic")
  //   // }
  // }
  
  // public dupSubscribeCheck(sub): any{
  //   var dupTopic = this.subscriptionList.filter( function (subscription) {
  //     return subscription.topic == sub.topic
  //   })
  //   return dupTopic;
  // }

  // public unSubscribe(sub, index) {
  //   sub.unsubscribe();
  //   this.subscriptionList.splice(index,1)
  // }

  // public unsafePublish(pub): void {
  //   this._mqttService.unsafePublish(pub.topic, pub.message, {qos: pub.qos, retain: pub.retain});
  //   this.pubList.push({'message': pub.message,	'topic': pub.topic,	'qos': pub.qos,	'time': new Date()})
  // }

  // public resetList(list) {
  //   if(list == 'sub') {
  //     this.subList = [];
  //   } else if(list == 'pub') {
  //     this.pubList = [];
  //   }
  // }

  // public ngOnDestroy() {
  //   //this.subscription.unsubscribe();
  // }
}