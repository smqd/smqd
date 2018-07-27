import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../../../models/plugin';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() column: Column;
  
  constructor() { }

  ngOnInit() {
  }

}
