import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) {}
  
  ngOnInit() {
  }

  ngAfterViewInit() {
    // jQuery('#side-menu').metisMenu();

    // if (jQuery("body").hasClass('fixed-sidebar')) {
    //   jQuery('.sidebar-collapse').slimscroll({
    //     height: '100%'
    //   })
    // }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

}
