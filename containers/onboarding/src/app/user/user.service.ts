import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserSignupDTO } from './user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  /* Make sure token is still valid */
  checkToken() {
    if (localStorage.getItem('token')) {
      const url = `${environment.apiURL}/auth/verify`;
      const headers =  new HttpHeaders({ 'x-access-token': localStorage.getItem('token') as string });
      this._http.get(url, { headers })
        .subscribe({
          next: () => {
            this.redirectToHome();
          },
          error: () => {}
        });
    }
  }

  signup(signupDTO: UserSignupDTO) {
    const url = `${environment.apiURL}/auth/signup`;
    this._http.post<{ success: boolean, username: string}>(url, signupDTO).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('username', response.username);
          this.redirectToLogin();
        }
      }
    });
  }

  /* Redirect to retail app authenticated */
  redirectToHome() {
    window.location.href = `${environment.retailURL}/home`;
  }

  /* Redirect to retail app unauthenticated */
  redirectToLogin() {
    window.location.href = `${environment.retailURL}/signin`;
  }
}
