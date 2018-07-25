import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PluginService } from '../../../services/plugin.service';
import { InstanceFailureResult } from '../../../models/plugin';

@Component({
  selector: 'app-plugin-failure',
  templateUrl: './plugin-failure.component.html',
  styleUrls: ['./plugin-failure.component.scss']
})
export class PluginFailureComponent implements OnInit {

  pluginName: string;
  instanceName: string;

  instanceStatus: InstanceFailureResult;
  
  constructor(private activatedRoute: ActivatedRoute, private pluginService: PluginService, private location: Location) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pluginName = params.get('plugin');
      this.instanceName = params.get('instance');
      this.getInstanceStatus();      
    });
  }

  getInstanceStatus() {
    this.pluginService.getInstanceStatus(this.pluginName, this.instanceName).subscribe(
      result => {
        if (result['code']) {
          return;
        }

        this.instanceStatus = result;
      }
    )
  }

  goBack() {
    this.location.back();
  }
}
