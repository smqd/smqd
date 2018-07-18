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
    //this.setDefaultData();
  }

  setDefaultData() {
    this.section.rows.forEach((row) => {
      if (row.type && row.type == 'growable') {
        console.log('growable data setting');
        var keyName;
        row.columns.forEach((column) => {
          console.log('growable column', column);
          if (column.key.endsWith('$0')) {
            const prefixIndex = column.key.indexOf('$0');
            const prefix = column.key.substring(0, prefixIndex-1);
            console.log('prefix = ', prefix);
            for (let config in this.defaultConfig) {
              if (config.substring(0, prefixIndex-1) == prefix) {
                console.log('config = ', config);
                const suffix = config.substring(prefixIndex);
                const suffixIndex = suffix.indexOf('.');
                keyName = suffix.substring(0, suffixIndex);
                console.log('keyName 111 = ', keyName, prefix+'.'+keyName);
                column.value = keyName;
              }
            };
          } else if (column.key.includes('$0') && keyName) {
            const keys = column.key.split('$0');
            var columnKeyName = keys[0] + keyName;
            
            if (keys.length == 2) {
              columnKeyName += keys[1];
            }
            console.log('keys', keys, columnKeyName, keyName);
            if (this.defaultConfig[columnKeyName]) {
              column.value = this.defaultConfig[columnKeyName];
            }
          }
        })
      } else {
        row.columns.forEach((column) => {
          if (this.defaultConfig[column.key]) {
            column.value = this.defaultConfig[column.key];
          }
        });
      }
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
