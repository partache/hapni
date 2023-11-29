import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, map, Observable, of} from "rxjs";
import {apiUrlFeature} from "../util/api-url";
import {Features} from "../models/features";
import {User} from "../models/User";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = apiUrlFeature(Features.USERS);
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this._isAuthenticated$.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  login(user:Partial<User>): Observable<User | null> {
    return this.httpClient
      .post<User>(this.apiUrl('login'), user, {observe: 'response'})
      .pipe(
        map(response => response.body),
      )
  }

  logout(): Observable<void> {
    return this.httpClient
      .post<void>(this.apiUrl('logout'), {})
  }

  register(user: User): Observable<User | Object> {
    return this.httpClient.post(this.apiUrl('register'), user)
  }

  handleLogin(newUser: User) {
    sessionStorage.setItem('email', newUser.email);
    sessionStorage.setItem('authToken', newUser.accessToken);
    sessionStorage.setItem('userId', newUser._id);
  }

  isAuthUser() {
   return sessionStorage.getItem('authToken');;
  }

  handleLogout() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
  }

  authenticate(): Observable<User>{
    return this.httpClient
      .get<User>(this.apiUrl('profile'))
      .pipe(
        tap(currentProfile => this.handleLogin(currentProfile)),
        catchError((err) => {
        return EMPTY;
      }));
  }

}
