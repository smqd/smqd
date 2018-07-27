import { Component, OnInit, OnDestroy, NgModule} from '@angular/core';
import { MqttService} from 'ngx-mqtt';
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
  will: FormGroup;
  option: FormGroup;
  sub: FormGroup;
  subList = [];
  subscriptionList = [];
  pub: FormGroup;
  pubList = [];
  viewWill = false;

  state: boolean;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.state = false;
    this.will = this.fb.group({
      'topic':["" ,Validators.compose([Validators.pattern('^[a-zA-Z0-9]*[^\+^\#]*[\/a-zA-Z0-9]*$')])],
      'payload': [""],
      'qos':[0],
      'retain': false
    });
    this.option = this.fb.group({
      'hostname': ['127.0.0.1', Validators.required],
      'port': [8086, Validators.required],
      'clientId': ['PubClient_' + parseInt((new Date().getTime()).toString().substring(10,12).concat(Math.floor(Math.random() * 100)+'', '0')),
                    Validators.required],
      'will': [null],
      'username': [null],
      'password': [null],
      'path': '/pubmqtt',
      'reconnectPeriod': false,
      'keepalive': 60
    });
    this.pub = this.fb.group({
      'topic':[null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*[^\+^\#]*[\/a-zA-Z0-9]*$')])],
      'message':[null],
      'qos':[0],
      'retain': [false]
    })
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
    }
    this.pubClient = new MqttService(option);
    this.pubClient.onReconnect.subscribe((message) => {
      //console.log("pub client : retry connect", message);
    });

    this.pubClient.onClose.subscribe(() => {
      //console.log("pub client : close");
      this.state = false;
    });

    this.pubClient.onConnect.subscribe(() => {
      this.state = true;
      //console.log("pub client : connect");
    });

    this.pubClient.onError.subscribe(() => {
      //console.log("pub client : error");
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
      return;
    }
    if (this.pub.invalid) {
      alert("INVALID PUBLISH OPTION")

      return;
    } 
    this.pubClient.unsafePublish(pub.topic, pub.message, {qos: pub.qos, retain: pub.retain});
    this.pubList.push({'message': pub.message,	'topic': pub.topic,	'qos': pub.qos,	'time': new Date()})
    
  }

  public resetList() {
    this.pubList = [];
  }

  public ngOnDestroy() {
    if( this.pubClient) {
      this.pubClient.disconnect();
    }
  }
  public toggle(){
    this.viewWill = !this.viewWill;
  }
}
