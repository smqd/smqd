import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../services/plugin.service';
import { ConfigResult, Column } from '../../../models/plugin';
import { KeystringPipe } from '../../../constants/keystring.pipe';
import { KeyobjectPipe } from '../../../constants/keyobject.pipe';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  pluginName: string;
  instanceName: string;
  pluginConfig: ConfigResult;
  instanceConfig: Column[];

  constructor(private activatedRoute: ActivatedRoute, private pluginService: PluginService, private location: Location) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pluginName = params.get('plugin');
      this.instanceName = params.get('instance');
      this.getInstanceConfig();
    });
  }

  getPluginConfig() {
    this.pluginService.getPluginConfig(this.pluginName).subscribe(
      config => {
        if (config['code']) {
          return;
        }

        this.pluginConfig = config;
      }
    );
  }

  getInstanceConfig() {
    this.pluginService.getInstanceConfig(this.pluginName, this.instanceName).subscribe(
      config => {
        if (config['code']) {
          return;
        }

        const keystringV = new KeystringPipe().transform(config['result']['config']);
        this.instanceConfig = [];
        for (let key in keystringV) {
          this.instanceConfig.push({key: key, value:keystringV[key], type:'', title:''});
        }
      }
    );
  }

  changeInstanceConfig() {
    var config = {'auto-start':true, config:{}};
    for (var i in this.instanceConfig) {
      new KeyobjectPipe().transform(config.config, this.instanceConfig[i].key, this.instanceConfig[i].value);
    }

    this.pluginService.modifyInstanceConfig(this.pluginName, this.instanceName, config).subscribe(
      result => {
        if (result['code']) {
          alert(result['error']);
          return;
        }

        this.location.back();
      }
    );

  }

  goBack() {
    this.location.back();
  }
}
