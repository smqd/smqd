import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Version, NodesResult } from '../../../models/dashboard';
import { MetricService } from '../../../services/metric.service';
import { Base } from '../../../models/base';
import { Config } from '../../../constants/config.constants';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  version: Version;
  clientCount: number;
  cpu: number;
  threadCount: number;

  nodes: NodesResult;

  metricsJvm: object;
  metricsMqtt: object;
  metricsWs: object;

  constructor(private dashboardService: DashboardService, private metricService: MetricService, private clientService: ClientService) { }

  ngOnInit() {
    this.getVersion();
    this.getClientCount();
    this.getJvmThreadCount();

    this.getNodes();

    this.getMqttMetric();
    this.getWsMetric();
    this.getJvmMetric();
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

  getJvmThreadCount() {
    this.metricService.getMetric('jvm/thread').subscribe(
      metrics => {
        if (metrics['code']) {
          return;
        }

        console.log('metrics = ', metrics.result['jvm.thread']);
        this.threadCount = metrics.result['jvm.thread']['count'];
      }
    )
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

  getJvmMetric() {
    this.metricService.getMetric('jvm/heap').subscribe(
      metrics => {
        if (metrics['code']) {
          return;
        }

        console.log('metrics = ', metrics.result['jvm.heap']);
        this.metricsJvm = metrics.result['jvm.heap'];
        if (this.metricsJvm['used']) {
          this.cpu = this.metricsJvm['used'];
          delete this.metricsJvm['used'];
        }
      }
    )
  }

  getWsMetric() {
    this.metricService.getMetric('core-mqtt/ws').subscribe(
      metrics => {
        if (metrics['code']) {
          return;
        }

        this.metricsWs = metrics.result['core-mqtt.ws'];
      }
    )
  }

  getMqttMetric() {
    this.metricService.getMetric('core-mqtt/mqtt').subscribe(
      metrics => {
        if (metrics['code']) {
          return;
        }

        this.metricsMqtt = metrics.result['core-mqtt.mqtt'];
      }
    )
  }
}
