import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../../services/plugin.service';
import { ConfigResult, ConfigSchema, Section, Column } from '../../../../models/plugin';
import { KeystringPipe } from '../../../../constants/keystring.pipe';
import { KeyobjectPipe } from '../../../../constants/keyobject.pipe';

@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddConfigComponent implements OnInit {

  pluginName: string;
  instanceName: string;
  pluginConfig: ConfigResult;
  configSchema: ConfigSchema;
  defaultConfig: ConfigResult;
  newConfig : Object;
  instanceConfig: Column[];

  constructor(private activatedRoute: ActivatedRoute, private pluginService: PluginService, private location: Location) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pluginName = params.get('plugin');
      this.instanceName = params.get('instance');
      this.getPluginConfig();
    });
  }

  getPluginConfig() {
    this.pluginService.getPluginConfig(this.pluginName).subscribe(
      config => {
        if (config['code']) {
          return;
        }

        this.pluginConfig = config;
        if (this.pluginConfig.result['config-schema']) {
          this.configSchema = new ConfigSchema(this.pluginConfig.result['config-schema']);
        }
        if (this.pluginConfig.result['default-config']) {
          this.newConfig = Object.assign(this.pluginConfig.result['default-config']);
          this.defaultConfig = new KeystringPipe().transform(this.pluginConfig.result['default-config']);
        }
        if (!this.configSchema.sections) {
          this.instanceConfig = [];
          for (let key in this.defaultConfig) {
            this.instanceConfig.push({key: key, value:this.defaultConfig[key], type:'', title:''});
          }
        }
      }
    );
  }

  addGrowableRow(section: Section) {
    let newRow = JSON.parse(JSON.stringify(section.rows[0]));
    section.rows.push(newRow);
  }

  createInstance() {
    if (!this.instanceName) {
      alert('instance name is required');
      return;
    }
    let newInstance = new KeystringPipe().transform(this.configSchema);
    var newPropKey;
    var newPropValue;
    var growableKeyName;
    for (var obj in newInstance) {
      if (obj.endsWith('key')) {
        newPropKey = newInstance[obj];
      }
      if (obj.endsWith('value')) {
        newPropValue = newInstance[obj];
      }
      if (newPropKey && newPropValue) {
        // replace key name of growable property
        if (newPropKey.includes('$0')) {
          if (newPropKey.endsWith('$0')) {
            newPropKey = newPropKey.replace('$0', newPropValue);
            growableKeyName = newPropValue;
            newPropKey = null;
            newPropValue = null;
            continue;
          }
          newPropKey = newPropKey.replace('$0', growableKeyName);
        }
        new KeyobjectPipe().transform(this.newConfig, newPropKey, newPropValue);
        newPropKey = null;
        newPropValue = null;
      }
    }
    this.newConfig = {'auto-start': false, config: this.newConfig};
    console.log('newConfig = ', this.newConfig);
    this.pluginService.createInstance(this.pluginName, this.instanceName, this.newConfig).subscribe(
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
