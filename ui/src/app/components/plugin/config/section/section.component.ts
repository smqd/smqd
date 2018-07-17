import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Section, ConfigResult } from '../../../../models/plugin';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent implements OnInit {

  @Input() section: Section;
  @Input() defaultConfig: ConfigResult;
  @Output() addRow = new EventEmitter();
  @Output() addKey = new EventEmitter();

  orgSection: Section;

  constructor() { }

  ngOnInit() {
    this.setDefaultData();
  }

  setDefaultData() {
    this.section.rows.forEach((row) => {
      row.columns.forEach((column) => {
        if (this.defaultConfig[column.key]) {
          column.value = this.defaultConfig[column.key];
        }
      });
    });
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
