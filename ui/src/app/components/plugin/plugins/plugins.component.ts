import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isString } from 'util';
import { IMqttMessage, MqttConnectionState } from 'ngx-mqtt';
import { PluginService } from '../../../services/plugin.service';
import { PluginsResult, InstanceResult } from '../../../models/plugin';
import { MqttMessageService } from '../../../services/mqtt-message.service';
import { Config } from '../../../constants/config.constants';


@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  plugins: PluginsResult;
  condition = {page_size:10, curr_page: 1};

  // mqtt
  topic: object;
  subClient;
  subscription: Subscription;

  constructor(private pluginService: PluginService, private router: Router, private mqttMessageService: MqttMessageService) { }

  ngOnInit() {
    this.getPlugins(this.condition);
  }

  getPlugins(condition) {
    this.pluginService.getPlugins(condition).subscribe(
      plugins => {
        if (plugins['code']) {
          return;
        }
        
        this.plugins = plugins;
        this.mqttConnect();
      }
    );
  }

  startInstance(pluginName, instanceName) {
    this.pluginService.startInstance(pluginName, instanceName).subscribe(
      result => {
        if (result['code']) {
          return;
        }

        const receivedInstance = new InstanceResult(result);
        // this.plugins.result.objects.forEach((plugin) => {
        //   if (plugin.package == receivedInstance.result.package && plugin.name == receivedInstance.result.plugin) {
        //     plugin.instances.forEach((instance) => {
        //       if (instance.name == receivedInstance.result.name) {
        //         instance.status = receivedInstance.result.status;
        //       }
        //     });
        //   }
        // });
      },
      error => {
        alert(error.error);
      }
    );
  }

  stopInstance(pluginName, instanceName) {
    this.pluginService.stopInstance(pluginName, instanceName).subscribe(
      result => {
        if (result['code']) {
          return;
        }

        const receivedInstance = new InstanceResult(result);
        // this.plugins.result.objects.forEach((plugin) => {
        //   if (plugin.package == receivedInstance.result.package && plugin.name == receivedInstance.result.plugin) {
        //     plugin.instances.forEach((instance) => {
        //       if (instance.name == receivedInstance.result.name) {
        //         instance.status = receivedInstance.result.status;
        //       }
        //     });
        //   }
        // });
      },
      error => {
        alert(error.error);
      }
    );
  }

  removeInstance(pluginName, instanceName) {
    this.pluginService.removeInstance(pluginName, instanceName).subscribe(
      result => {
        if (result['code']) {
          return;
        }

        this.getPlugins(this.condition);        
      },
      error => {
        alert(error.error);
      }
    );
  }

  pageChanged(event: any): void {
    this.condition.curr_page = event.page;
    this.getPlugins(this.condition);
  }

  mqttConnect() {
    this.subClient = this.mqttMessageService.connectMqtt(Config.mqttConnectOption);
    this.subClient.state.pipe().subscribe(state => {
      if (state == MqttConnectionState.CONNECTED) {
        this.subscribe();
      }
    });
  }

  public subscribe() {
    this.subscription = this.subClient.observe(Config.mqttPlugInTopic.topic, {qos: Config.mqttPlugInTopic.qos}).subscribe((message: IMqttMessage) => {
      var mqttMessage = JSON.parse(message.payload.toString());        
      //var mqttMessage = {"smqd-core.thing2x-core-fault-logger.core-fault": {status: "START"}};
      for (let key in mqttMessage) {
        let keyList = key.split('.');
        if (keyList.length == 3 && this.plugins) {
          this.plugins.result.objects.forEach((plugin) => {
            if (plugin.package == keyList[0] && plugin.name == keyList[1]) {
              plugin.instances.forEach((instance) => {
                if (instance.name == keyList[2]) {
                  instance.status = mqttMessage[key].status;
                }
              });
            }
          });
        }
      }
    });
  }

  public ngOnDestroy() {
    if(this.subscription){
      this.mqttMessageService.unsubscribe(this.subscription);
      this.mqttMessageService.disConnectMqtt();
    }
  }
}
