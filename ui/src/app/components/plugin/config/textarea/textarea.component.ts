import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../../../models/plugin';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  
  @Input() column: Column;

  constructor() { }

  ngOnInit() {
  }

}
