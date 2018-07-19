import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Column } from '../../../../models/plugin';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {

  @Input() column: Column;

  constructor() { }

  ngOnInit() {
  }
}
