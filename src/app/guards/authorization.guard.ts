import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('gaursd', route);
    console.log(this.authService);
    if (
      this.authService.authenticated &&
      route.data['role'].includes(this.authService.role)
    ) {
      console.log('true {###########');
      return true;
    } else {
      console.log('false ########');
      this.router.navigate(['/notAuthorized']);
      return false;
    }
  }
}
