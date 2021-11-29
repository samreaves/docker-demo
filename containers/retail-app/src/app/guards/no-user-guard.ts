import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
 
@Injectable()
export class NoUserGuard implements CanActivateChild {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | UrlTree {
    return this.userService.getUser().pipe(
      tap(user => {
        if (user) {
          return this.router.navigateByUrl('home');
        }
        return;
      }),
      map(user => user ? false : true)
    );
  }
}
