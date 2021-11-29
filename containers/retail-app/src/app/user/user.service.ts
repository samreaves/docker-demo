import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserCredentials } from './user.models';
import { mockUser } from './user.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null); 

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  /* Poll every 30 seconds to make sure token is still valid */
  pollForToken() {
    const checkTokenPoll = setInterval(() => {
      if (this.user$.getValue()) {
        this.checkToken()
          .subscribe({
            next: () => {},
            error: () => {
              this.clearUser();
              this._router.navigate([`/signin`]);
              clearInterval(checkTokenPoll);
            }
          });
      }
    }, 30000);
  }

  /* Redirect to home if valid token found */
  redirectToHomeIfTokenIsValid() {
    if (localStorage.getItem('token')) {
      this.checkToken()
        .subscribe({
          next: () => {
            this.getUserInfo().then(() => {
              this._router.navigate([`/home`]);
              this.pollForToken();
            });
        }})
    }
  }

  /* Make sure token is still valid */
  checkToken() {
    const url = `${environment.apiURL}/auth/verify`;
    const headers =  new HttpHeaders({ 'x-access-token': localStorage.getItem('token') as string });
    return this._http.get(url, { headers });
  }

  /* Sign In */
  signIn(credentials: UserCredentials) {
    /* Call sign in endpoint with user / pass payload */
    this._http.post<{ success: Boolean, token: string}>(`${environment.apiURL}/auth/login`, { username: credentials.username, password: credentials.password })
      .subscribe({
        next: (response) => {
          if (response.success && response.token) {
            localStorage.setItem('username', credentials.username);
            localStorage.setItem('token', response.token);
            this.getUserInfo().then(() => {
              this._router.navigate([`/home`]);
              this.pollForToken();
            });
          }
        }, 
        error: (error) => {
          console.error(error);
        }
      });
  }

  /* Sign Out */
  signOut(): void {
    /* Clear session storage */
    /* Route to sign in */
    this.clearUser();
    this._router.navigate([`/signin`]);
  }

  /* Redirect to onboarding app */
  redirectToSignUp() {
    window.location.href = environment.onboardingURL;
  }

  /* Get User Info */
  async getUserInfo() {
    const url = `${environment.apiURL}/api/users/${localStorage.getItem('username')}`;
    const headers =  new HttpHeaders({ 'x-access-token': localStorage.getItem('token') as string });

    const user = await this._http.get<User>(url, { headers }).toPromise();
    this.user$.next(user as User);
  }

  /* Get User */
  getUser(): BehaviorSubject<User | null> {
    return this.user$
  }

  clearUser() {
    this.user$.next(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}
