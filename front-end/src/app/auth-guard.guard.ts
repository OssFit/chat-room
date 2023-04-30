import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated=this.authService.isAuth();
    if (route.url[0]?.path === 'chatroom'){
      if (isAuthenticated) {
        return true;
      }
      return this.router.navigate(['/']);
    }
    if (isAuthenticated) {
      return this.router.navigate(['/chatroom']);
    }
    return true;
  }
}
