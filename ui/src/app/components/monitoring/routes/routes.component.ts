import { Component, OnInit } from '@angular/core';
import { Routes } from '../../../models/route';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  routes: Routes;
  condition = {page_size:10, curr_page: 1}

  constructor(private routeService: RouteService) { }

  ngOnInit() {
    this.getRoutes(this.condition);
  }

  getRoutes(condition) {
    //this.loaderService.showLoader();
    this.routeService.getRoutes(condition).subscribe(
      routes => {
        if (routes['code']) {
          return;
        }
        
        this.routes = routes;
        console.log('this.routes = ', this.routes);
        //this.loaderService.hideLoader();
      }
    );
  }

  pageChanged(event: any): void {
    this.condition.curr_page = event.page;
    this.getRoutes(this.condition);
  }
}
