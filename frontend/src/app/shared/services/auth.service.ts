import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { Features } from '../models/features'
import {AuthUser, User} from '../models/user'
import { apiUrlFeature } from '../util/api-url'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = apiUrlFeature(Features.USERS)
    private _isAuthenticated$ = new BehaviorSubject<boolean>(false)
    isAuthenticated$: Observable<boolean> = this._isAuthenticated$.asObservable()

    constructor(private httpClient: HttpClient) {}

    login(user: Partial<User>): Observable<AuthUser | null> {
        return this.httpClient.post<AuthUser>(this.apiUrl('login'), user, { observe: 'response' })
          .pipe(
            tap(() => this._isAuthenticated$.next(true)),
            map((response) => response.body)
          )
    }

    logout(): Observable<void> {
        return this.httpClient.get<void>(this.apiUrl('logout'), {}).pipe(tap(() => this._isAuthenticated$.next(false)));
    }

    register(user: Partial<User>): Observable<AuthUser> {
        return this.httpClient.post<AuthUser>(this.apiUrl('register'), user).pipe(tap(() => this._isAuthenticated$.next(true)));
    }

    handleLogin(newUser: AuthUser) {
        sessionStorage.setItem('email', newUser.email)
        sessionStorage.setItem('authToken', newUser.accessToken)
        sessionStorage.setItem('userId', newUser._id)
    }

    isAuthUser() {
        return sessionStorage.getItem('authToken') ?? ''
    }

    handleLogout() {
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('authToken')
        sessionStorage.removeItem('userId')
    }

    authenticate(): Observable<User> {
        return this.httpClient.get<User>(this.apiUrl('profile')).pipe(
            tap((currentProfile) => this.handleLogin(currentProfile)),
            catchError((err) => {
                return EMPTY
            })
        )
    }
}
