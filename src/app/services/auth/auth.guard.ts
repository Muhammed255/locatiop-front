import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/user/login'], {queryParams: {'redirectUrl': state.url}});
    }
    return isAuth;
  }
}


@Injectable()
export class AuthGuardMainAdmin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    const role = localStorage.getItem("role");
    if (role === 'user' && isAuth) {
      this.router.navigate(['/account/homepage'], {queryParams: {'redirectUrl': state.url}});
      return false;
    }
    else if (role === 'storeadmin' && isAuth) {
      this.router.navigate(['/home'], {queryParams: {'redirectUrl': state.url}});
      return false;
    } else {
      return true;
    }
  }
}


@Injectable()
export class AuthGuardStoreAdmin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    const role = localStorage.getItem("role");
    if (role === 'user' && isAuth) {
      this.router.navigate(['/account/homepage'], {queryParams: {'redirectUrl': state.url}});
      return false;
    }
    else if (role === 'mainadmin' && isAuth) {
      this.router.navigate(['/main-admin/dashboard'], {queryParams: {'redirectUrl': state.url}});
      return false;
    } else if(!isAuth) {
       this.router.navigate(['/user/login'], {queryParams: {'redirectUrl': state.url}});
    } else {
      return true;
    }
  }
}


@Injectable()
export class AuthGuardUser implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    const role = localStorage.getItem("role");
    if (role !== 'user' && !isAuth) {
      this.router.navigate(['/user/login'], {queryParams: {'redirectUrl': state.url}});
      return false;
    } else {
      return true;
    }
  }
}


@Injectable()
export class AuthGuardLogin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    const role = localStorage.getItem("role");
    if (role === 'user' && isAuth) {
      this.router.navigate(['/account/homepage']);
      return false;
    } else if (role === 'storeadmin' && isAuth) {
      this.router.navigate(['/home']);
      return false;
    } else if (role === 'mainadmin' && isAuth) {
      this.router.navigate(['/main-admin/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}