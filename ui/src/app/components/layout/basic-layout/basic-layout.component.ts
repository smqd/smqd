import { Component, OnInit } from '@angular/core';
import { detectBody } from '../../../app.helpers';

@Component({
  selector: 'app-basic',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    detectBody();
  }

  onResize(){
    detectBody();
  }
}