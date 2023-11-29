import { HttpErrorResponse } from '@angular/common/http'
import { Component } from '@angular/core'

import { PostsStep } from '../../features/models/posts-step'
import { Features } from '../../shared/models/features'
import { User } from '../../shared/models/user'
import { AuthService } from '../../shared/services/auth.service'
import { RoutingService } from '../../shared/services/routing.service'
import { LoginAsyncError } from '../models/login-async-error'

@Component({
    selector: 'app-login',
    template: ` <app-auth-form (submitForm)="handleLogin($event)"></app-auth-form> `,
})
export class LoginComponent {
    asyncError?: LoginAsyncError

    constructor(
        private auth: AuthService,
        private router: RoutingService
    ) {}

    handleLogin(formValues: unknown): void {
        const { email, password } = formValues as unknown as Partial<User>

        this.auth.login({ email, password }).subscribe({
            next: () => {
                this.router.navigateToStep(Features.USERS, PostsStep.CATALOG)
            },
            error: (err: HttpErrorResponse) => {
                this.asyncError = this.getHttpError(err)
            },
        })
    }

    private getHttpError(error: HttpErrorResponse): LoginAsyncError {
        switch (error.status) {
            case 400:
                return { invalidPasswordOrUser: true }
            default:
                return { unknownServerError: true }
        }
    }
}
