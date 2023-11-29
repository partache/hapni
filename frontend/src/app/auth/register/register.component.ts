import { Component } from '@angular/core'
import { LoginAsyncError } from '../models/login-async-error'
import { AuthService } from '../../shared/services/auth.service'
import { RoutingService } from '../../shared/services/routing.service'
import { Features } from '../../shared/models/features'
import { HttpErrorResponse } from '@angular/common/http'
import { PostsStep } from '../../features/models/posts-step'
import { NonNullableFormBuilder, Validators } from '@angular/forms'
import { emailValidator, passwordMatchValidator } from '../../shared/util/validators'
import { UserStep } from '../models/user-step'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    asyncError?: LoginAsyncError

    registerForm = this.fb.group({
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        repeatPassword: ['', [Validators.required, passwordMatchValidator]],
    })

    constructor(
        private auth: AuthService,
        private router: RoutingService,
        private fb: NonNullableFormBuilder
    ) {}

    submit(): void {
        this.registerForm.markAllAsTouched()
        console.log(this.registerForm)

        if (this.registerForm.invalid) {
            return
        }

        const { email, password } = this.registerForm.getRawValue()

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
}
