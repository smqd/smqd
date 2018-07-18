import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../services/plugin.service';
import { ConfigResult, Column, ConfigSchema, Section } from '../../../models/plugin';
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
  configSchema: ConfigSchema;
  //orgConfig: ConfigResult;
  viewConfig: ConfigResult;
  newConfig: ConfigResult;
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

        this.newConfig = config['result']['config'];
        //this.orgConfig = Object.assign({}, config['result']['config']);
        this.viewConfig = new KeystringPipe().transform(config['result']['config']);
        var growableName = [];
        for (let key in config['result']['config']) {
          console.log('key = ', key, typeof config['result']['config'][key]);
          if (Array.isArray(config['result']['config'][key])) {
            growableName.push({key: key, length: config['result']['config'][key].length});
            console.log('growableName = ', growableName, config['result']['config'][key].length);
          }
        }
        
        if (this.configSchema.sections) {
          this.configSchema.sections.forEach((section) => {
            section.rows.forEach((row) => {
              if (row.type && row.type == 'growable') {
                for(let i = 0; i < growableName.length; i++) {
                  console.log('growableName.key = ', growableName[i].key, row.columns[0].key);
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
                console.log('section.rows = ', section.rows);
                  row.columns.forEach((column) => {
                    const key = column.key.replace('.#.', '.'+i+'.');
                    console.log('column = ', column.key, key);
                    if (this.viewConfig[key]) {
                      column.value = this.viewConfig[key];
                    }
                  });
              } else {
                row.columns.forEach((column) => {
                  //console.log('section.row.column', column, this.defaultConfig[column.key]);
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
            this.instanceConfig.push({key: key, value:this.viewConfig[key], type:'', title:''});
          }
          console.log('this.instanceConfig = ', this.instanceConfig);
        }
      }
    );
  }

  changeInstanceConfig() {
    // growable array 를 초기화 시킨다. 
    for (let key in this.newConfig) {
      if (Array.isArray(this.newConfig[key])) {
        this.newConfig[key]=[];
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
                this.newConfig[keyList[0]].push(obj);
              }
            } else {
              row.columns.forEach((column) => {
                new KeyobjectPipe().transform(this.newConfig, column.key, column.value);
              });
            }
          })
        });
      } else {
        this.instanceConfig.forEach((column) => {
          new KeyobjectPipe().transform(this.newConfig, column.key, column.value);
        });
      }
    } else {
      for (var i in this.instanceConfig) {
        new KeyobjectPipe().transform(this.newConfig, this.instanceConfig[i].key, this.instanceConfig[i].value);
      }
    }

    //console.log('modifyInstanceConfig = ', this.newConfig);
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
