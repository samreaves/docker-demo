import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
 
@Injectable()
export class UserExistsGuard implements CanActivateChild {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | UrlTree {
    return this.userService.getUser().pipe(
      tap(user => {
        if (!user) {
          return this.router.navigateByUrl('signin');
        }
        return;
      }),
      map(user => user ? true : false),
    );
  }
}