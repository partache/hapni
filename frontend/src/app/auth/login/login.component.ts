import { HttpErrorResponse } from '@angular/common/http'
import { Component } from '@angular/core'

import { PostsStep } from '../../features/models/posts-step'
import { Features } from '../../shared/models/features'
import { AuthService } from '../../shared/services/auth.service'
import { RoutingService } from '../../shared/services/routing.service'
import { LoginAsyncError } from '../models/login-async-error'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { emailValidator } from '../../shared/util/validators'
import { UserStep } from '../models/user-step'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    asyncError?: LoginAsyncError

    loginForm = this.fb.group({
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        repeatPassword: ['', Validators.required],
    })

    constructor(
        private auth: AuthService,
        private router: RoutingService,
        private fb: NonNullableFormBuilder
    ) {}

    submit(): void {
        this.loginForm.markAllAsTouched()
        console.log(this.loginForm)

        if (this.loginForm.invalid) {
            return
        }

        const { email, password } = this.loginForm.getRawValue()

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

    protected readonly UserStep = UserStep
  protected readonly Features = Features
}
