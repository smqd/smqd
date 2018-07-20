import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../../services/plugin.service';
import { ConfigSchema, Section, Column, InstanceConfig, PluginConfigResult } from '../../../../models/plugin';
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
  pluginConfig: PluginConfigResult;
  configSchema: ConfigSchema;
  defaultConfig: InstanceConfig;
  newConfig : InstanceConfig = new InstanceConfig({'auto-start': false, config:{}});
  instanceConfig: Column[];

  autoStart: boolean = false;

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
          this.newConfig.config = Object.assign(this.pluginConfig.result['default-config']);
          this.defaultConfig = new KeystringPipe().transform(this.pluginConfig.result['default-config']);
        }

        if (this.configSchema.sections) {
          this.configSchema.sections.forEach((section) => {
            section.rows.forEach((row) => {
              row.columns.forEach((column) => {
                if (this.defaultConfig[column.key]) {
                  column.value = this.defaultConfig[column.key];
                }
              });
            })
          })
        } else {
        // configSchema가 없을 경우에는 defaultConfig 만 화면에 표시한다.
          this.instanceConfig = [];
          for (let key in this.defaultConfig) {
            this.instanceConfig.push({key: key, value:this.defaultConfig[key], type:null, title:null, placeHolder:null});
          }
          console.log('this.instanceConfig = ', this.instanceConfig);
        }
      }
    );
  }

  addGrowableRow(section: Section) {
    let newRow = JSON.parse(JSON.stringify(section.rows[0]));
    newRow.columns.forEach((column) => {
      column.value = null;
    });
    section.rows.push(newRow);
  }

  createInstance() {
    if (!this.instanceName) {
      alert('instance name is required');
      return;
    }
      // growable array 를 초기화 시킨다. 
      for (let key in this.newConfig.config) {
        if (Array.isArray(this.newConfig.config[key])) {
          this.newConfig.config[key]=[];
        }
      }

    if (this.configSchema.sections) {
      this.configSchema.sections.forEach((section) => {
        section.rows.forEach((row) => {
          var keyList;
          var obj = {};
          if (row.type && row.type == 'growable') {
            row.columns.forEach((column) => {
              if (column.value && column.value != null) {
                if (column.key.includes('#')) {
                  keyList = column.key.split('.#.');
                }
                new KeyobjectPipe().transform(obj, column.key.substr(keyList[0].length+3), column.value);
              }
            });
            
            if (Object.keys(obj).length > 0) {
              this.newConfig.config[keyList[0]].push(obj);
            }
          } else {
            row.columns.forEach((column) => {
              new KeyobjectPipe().transform(this.newConfig.config, column.key, column.value);
            });
          }
        })
      });
    } else {
      this.instanceConfig.forEach((column) => {
        new KeyobjectPipe().transform(this.newConfig.config, column.key, column.value);
      });
    }

    console.log('newConfig = ', this.newConfig);
    this.pluginService.createInstance(this.pluginName, this.instanceName, this.newConfig).subscribe(
      result => {
        if (result['code']) {
          alert(result['error']);
          return;
        }
        this.location.back();
      },
      error => {
        alert(error.error);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
