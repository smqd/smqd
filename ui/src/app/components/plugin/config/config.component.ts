import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../services/plugin.service';
import { ConfigResult } from '../../../models/plugin';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  pluginName: string;
  instanceName: string;
  config: ConfigResult;

  constructor(private activatedRoute: ActivatedRoute, private pluginService: PluginService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pluginName = params.get('plugin');
      this.instanceName = params.get('instance');
      this.getConfig();
    });
  }

  getConfig() {
    //this.loaderService.showLoader();
    this.pluginService.getConfig(this.pluginName, this.instanceName).subscribe(
      config => {
        if (config['code']) {
          return;
        }

        this.config = config;
        console.log('this.config = ', this.config);
        //this.loaderService.hideLoader();
      }
    );
  }
}
