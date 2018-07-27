import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttConnectionState } from 'ngx-mqtt';
import { DashboardService } from '../../../services/dashboard.service';
import { Version, NodesResult } from '../../../models/dashboard';
import { MetricService } from '../../../services/metric.service';
import { ClientService } from '../../../services/client.service';
import { MqttMessageService } from '../../../services/mqtt-message.service';
import { Config } from '../../../constants/config.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  version: Version;
  clientCount: number;

  nodes: NodesResult;

  // metric
  metrics: object;
  keyNames = {mqtt: 'core-mqtt.mqtt', ws: 'core-mqtt.ws', jvm: 'jvm.heap', cpu: 'jvm.cpu.load', thread: 'jvm.thread.count', fd: 'jvm.fd'}

  // mqtt
  topic: object;
  subClient;
  subscription: Subscription;


  constructor(private dashboardService: DashboardService, private metricService: MetricService, private clientService: ClientService, private mqttMessageService: MqttMessageService) { }

  ngOnInit() {
    this.getVersion();
    this.getClientCount();
    this.getNodes();
    this.getMetrics();

    this.mqttConnect();
  }

  getVersion() {
    this.dashboardService.getVersion().subscribe(
      version => {
        if (version['code']) {
          return;
        }

        this.version = version;
      }
    );
  }

  getClientCount() {
    this.clientService.getClients({page_size:10, curr_page: 1}).subscribe(
      clients => {
        if (clients['code']) {
          return;
        }

        this.clientCount = clients.result.total_num;
      }
    );
  }

  getNodes() {
    this.dashboardService.getNodes().subscribe(
      nodes => {
        if (nodes['code']) {
          return;
        }

        this.nodes = nodes;
      }
    );
  }

  getMetrics() {
    this.metricService.getMetrics().subscribe(
      metrics => {
        if (metrics['code']) {
          return;
        }

        this.metrics = metrics.result;
      }
    );
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
    console.log('call subscribe in dashboard ###');
    this.subscription = this.subClient.observe(Config.mqttMetricTopic.topic,{qos: Config.mqttMetricTopic.qos}).subscribe((message: IMqttMessage) => {
      var mqttMessage = JSON.parse(message.payload.toString());
      for (let key in mqttMessage) {
        if (this.metrics) {
          this.metrics[key] = mqttMessage[key];
        } else {
          this.metrics = mqttMessage;
        }
      }
    });
  }

  public ngOnDestroy() {
    if(this.subscription) {
      this.mqttMessageService.unsubscribe(this.subscription);
    }
    if (this.subClient) {
      this.mqttMessageService.disConnectMqtt();
    }
  }
}
