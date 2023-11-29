import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'

import { LoginAsyncError, LoginAsyncErrors, validationMessage } from '../../../auth/models/login-async-error'
import { UserStep } from '../../../auth/models/user-step'
import { FormControlPipe } from '../../pipe/form-control.pipe'
import { emailValidator, passwordMatchValidator } from '../../util/validators'

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
})
export class AuthFormComponent implements AfterViewInit {
    @Input() isLogin = true
    @Input() asyncErrors?: LoginAsyncError
    @Output() submitForm = new EventEmitter<unknown>()
    loginForm: FormGroup
    protected readonly UserStep = UserStep

    constructor(private fb: NonNullableFormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, emailValidator]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            repeatPassword: ['', Validators.required],
        })
    }

    ngAfterViewInit() {
        if (!this.isLogin) {
            this.loginForm.addControl('repeatPassword', this.fb.control('', [Validators.required, Validators.minLength(5)]))
        } else {
            this.loginForm.removeControl('repeatPassword')
        }
    }

    private addControl(): void {
        // this.loginForm = this.fb.group({
        //     ...this.loginForm.controls,
        //     repeatPassword: ['', Validators.required, Validators.minLength(5), passwordMatchValidator]
        // });
        // this.loginForm.addControl('repeatPassword', this.fb.control(['', Validators.required, Validators.minLength(5), passwordMatchValidator]));
        const repeatPassword = new FormControl('')
        //@ts-ignore
        this.loginForm.addControl('repeatPassword', repeatPassword)

        repeatPassword.setValidators([Validators.required, Validators.minLength(5), passwordMatchValidator])
        repeatPassword.updateValueAndValidity()
    }

    private removeControl() {
        const repeatPassword = new FormControl('')
        //@ts-ignore
        this.loginForm.removeControl('repeatPassword', repeatPassword)
        this.loginForm.updateValueAndValidity()
    }

    submit(): void {
        this.loginForm.markAllAsTouched()
        console.log(this.loginForm)

        if (this.loginForm.invalid) {
            return
        }
        const { email, password, repeatPassword } = this.loginForm.getRawValue()
        this.submitForm.emit({ email, password })
    }

    protected formControlHasErrors(control: AbstractControl) {
        return Object.values(LoginAsyncErrors).find((v) => control.hasError(v as string))
    }

    protected passwordControlValidationMessage() {
        if (this.loginForm.hasError(LoginAsyncErrors.passwordMismatch)) {
            return validationMessage(LoginAsyncErrors.passwordMismatch)
        }

        return ''
    }

    protected emailValidationMessage() {
        if (this.loginForm.hasError(LoginAsyncErrors.emailNotValid)) {
            return validationMessage(LoginAsyncErrors.emailNotValid)
        }

        return ''
    }

    formInvalid(formControl: FormControl) {
        return formControl.touched || formControl.dirty || formControl.invalid
    }

    protected readonly FormControlPipe = FormControlPipe
}
