import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../../services/plugin.service';
import { PluginConfigResult, Column, ConfigSchema, Section, InstanceConfigResult, InstanceConfig } from '../../../../models/plugin';
import { KeystringPipe } from '../../../../pipe/keystring.pipe';
import { KeyobjectPipe } from '../../../../pipe/keyobject.pipe';

@Component({
  selector: 'app-add-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss']
})
export class EditConfigComponent implements OnInit {

  pluginName: string;
  instanceName: string;

  pluginConfig: PluginConfigResult;
  configSchema: ConfigSchema;
  viewConfig: InstanceConfig;
  newConfig: InstanceConfig;
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
        console.log('pluginConfig = ', this.pluginConfig);
        if (this.pluginConfig.result['config-schema']) {
          this.configSchema = new ConfigSchema(this.pluginConfig.result['config-schema']);
        }
        this.getInstanceConfig();
      }
    );
  }

  getInstanceConfig() {
    this.pluginService.getInstanceConfig(this.pluginName, this.instanceName).subscribe(
      config => {
        if (config['code']) {
          return;
        }

        this.newConfig = config['result'];
        console.log('this.newConfig =', this.newConfig);
        this.viewConfig = new KeystringPipe().transform(this.newConfig.config);
        var growableName = [];
        for (let key in this.newConfig.config) {
          if (Array.isArray(this.newConfig.config[key])) {
            growableName.push({key: key, length: this.newConfig.config[key].length});
          }
        }
        
        if (this.configSchema.sections) {
          this.configSchema.sections.forEach((section) => {
            section.rows.forEach((row) => {
              if (row.type && row.type == 'growable') {
                for(let i = 0; i < growableName.length; i++) {
                  if (row.columns[0].key.startsWith(growableName[i].key)) {
                    
                    for (let j=section.rows.length; j < growableName[i].length;j++) {
                      section.rows.push(JSON.parse(JSON.stringify(section.rows[0])));
                    }
                  }
                }
              }
            });
          });
          this.configSchema.sections.forEach((section) => {
            for(let i = 0; i < section.rows.length; i++) {
              var row = section.rows[i];
              if (row.type && row.type == 'growable') {
                  row.columns.forEach((column) => {
                    const key = column.key.replace('.#.', '.'+i+'.');
                    if (this.viewConfig[key]) {
                      column.value = this.viewConfig[key];
                    }
                  });
              } else {
                row.columns.forEach((column) => {
                  if (this.viewConfig[column.key]) {
                    column.value = this.viewConfig[column.key];
                  }
                });
              }
            }
          });
        } else {
          // configSchema가 없을 경우에는 defaultConfig 만 화면에 표시한다.
          this.instanceConfig = [];
          for (let key in this.viewConfig) {
            this.instanceConfig.push({key: key, value: this.viewConfig[key], type: null, title: null, placeHolder: null});
          }
        }
      }
    );
  }

  changeInstanceConfig() {
    // growable array 를 초기화 시킨다. 
    for (let key in this.newConfig.config) {
      if (Array.isArray(this.newConfig.config[key])) {
        this.newConfig.config[key]=[];
      }
    }

    if (this.configSchema) {
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
    } else {
      for (var i in this.instanceConfig) {
        new KeyobjectPipe().transform(this.newConfig, this.instanceConfig[i].key, this.instanceConfig[i].value);
      }
    }

    console.log('modifyInstanceConfig = ', this.newConfig);
    this.pluginService.modifyInstanceConfig(this.pluginName, this.instanceName, this.newConfig).subscribe(
      result => {
        if (result['code']) {
          return;
        }

        this.location.back();
      },
      error => {
        alert(error.error);
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

  goBack() {
    this.location.back();
  }
}
