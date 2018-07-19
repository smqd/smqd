import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Version, NodesResult } from '../../../models/dashboard';
import { MetricService } from '../../../services/metric.service';
import { Base } from '../../../models/base';
import { Config } from '../../../constants/config.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  version: Version;
  nodes: NodesResult;
  metrics: Base; 
  sortedMetrics: object;
  metricsJvm: object;
  metricsMqtt: object;

  constructor(private dashboardService: DashboardService, private metricService: MetricService) { }

  ngOnInit() {
    this.getVersion();
    this.getNodes();
    this.getMetrics();
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

        this.metrics = metrics;
        this.sortedMetrics = Object
        .keys(this.metrics['result'])
        .sort((a, b) => this.metrics['result'][a]-this.metrics['result'][b])
        .reduce((_sortedObj, key) => ({
          ..._sortedObj, 
          [key]: this.metrics['result'][key]
        }), {})

        this.metricsJvm = {};
        this.metricsMqtt = {};
        for(var prop in this.sortedMetrics) {
          if (prop.startsWith(Config.metrics.jvm)) {
            this.metricsJvm[prop.substr(Config.metrics.jvm.length + 1)] = this.sortedMetrics[prop]; 
          } else if (prop.startsWith(Config.metrics['core-mqtt'])) {
            this.metricsMqtt[prop.substr(Config.metrics['core-mqtt'].length + 1)] = this.sortedMetrics[prop];
          }
        }
      }
    );
  }
}
