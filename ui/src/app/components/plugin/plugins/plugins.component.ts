import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PluginService } from '../../../services/plugin.service';
import { PluginsResult, InstanceResult } from '../../../models/plugin';


@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  plugins: PluginsResult;

  condition = {page_size:10, curr_page: 1}

  constructor(private pluginService: PluginService, private router: Router) { }

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
        this.plugins.result.objects.forEach((plugin) => {
          if (plugin.package == receivedInstance.result.package && plugin.name == receivedInstance.result.plugin) {
            plugin.instances.forEach((instance) => {
              if (instance.name == receivedInstance.result.name) {
                instance.status = receivedInstance.result.status;
              }
            });
          }
        });
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
        this.plugins.result.objects.forEach((plugin) => {
          if (plugin.package == receivedInstance.result.package && plugin.name == receivedInstance.result.plugin) {
            plugin.instances.forEach((instance) => {
              if (instance.name == receivedInstance.result.name) {
                instance.status = receivedInstance.result.status;
              }
            });
          }
        });
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

}
