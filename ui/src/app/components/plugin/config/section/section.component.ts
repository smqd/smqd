import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Section, InstanceConfig } from '../../../../models/plugin';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent implements OnInit {

  @Input() section: Section;
  @Input() defaultConfig: InstanceConfig;
  @Output() addRow = new EventEmitter();
  @Output() addKey = new EventEmitter();

  orgSection: Section;

  constructor() { }

  ngOnInit() {

  }

  add() {
    this.addRow.emit(this.section);
  }

  delete(row) {
    for(let i = 0; i < this.section.rows.length; i++) {
      if (row == this.section.rows[i]) {
        this.section.rows.splice(i, 1);
      }
    }
  }
}
