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
  metricsBytes: object;
  metricsMessages: object;

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
        this.metricsBytes = {};
        this.metricsMessages = {};
        for(var prop in this.metrics['result']) {
          console.log('prop = ', prop, this.metrics['result'][prop]);
          // if (prop.startsWith(Config.metrics.bytes)) {
          //   this.metricsBytes[prop.substr(Config.metrics.bytes.length + 1)] = this.metrics['result'][prop]; 
          // } else if (prop.startsWith(Config.metrics.messages)) {
          //   this.metricsMessages[prop.substr(Config.metrics.messages.length + 1)] = this.metrics['result'][prop];
          // }
        }
      }
    );   
  }
}
