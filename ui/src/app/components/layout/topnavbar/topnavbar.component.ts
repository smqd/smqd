import { Component, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

declare var jQuery:any;
@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopnavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  // toggleNavigation(): void {
  //   jQuery("body").toggleClass("mini-navbar");
  //   smoothlyMenu();
  // }

  logout() {
    this.authService.removeAuthorizationToken();
    this.router.navigateByUrl('/login');
  }
}
