import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let result = false;
      let permission = '';

      if (this.authService.getAccessToken() == null || this.authService.isAuthTokenExpired('refresh_token')) {
        this.authService.removeAuthorizationToken();
        result = false;
      } else {
        result = true;
      }

      if (result) {
        // permission check
        if (route && route.data && route.data['permission']) {
          permission = route.data['permission'];
          result = this.permissionCheck(permission);
        }
      } else {
        console.log('### auth.guard ### route to login');
        this.router.navigate(['/login']);
      }
      return result;
  }

  permissionCheck(permission: string): boolean {
    let result = false;
    if (permission && permission.length > 0) {

      // TODO permission check
      result = true;
    }
    return result;
  }
}
