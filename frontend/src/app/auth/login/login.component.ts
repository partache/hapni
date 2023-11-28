import {Component} from '@angular/core';
import {AbstractControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {RoutingService} from "../../shared/services/routing.service";
import {Features} from "../../shared/models/features";
import {HomeStep} from "../../shared/models/home-step";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginAsyncError, LoginAsyncErrors, validationMessage} from "./models/login-async-error";
import {emailValidator, passwordMatchValidator} from "../../shared/util/validators";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  readonly PASSWORD_CTRL_NAME = 'password';
  readonly REPEAT_PASSWORD_CTRL_NAME = 'repeatPassword';

  loginForm = this.fb.group({
    email: ['', Validators.required, emailValidator],
    password: ['', Validators.required, Validators.minLength(5)],
    repeatPassword: ['', Validators.required, Validators.minLength(5), passwordMatchValidator]
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private auth: AuthService,
    private router: RoutingService) {
  }

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    const {email, password} = this.loginForm.value;

    this.auth.login({email, password}).subscribe({
      next: () => {
        this.router.navigateToStep(Features.HOME, HomeStep.HOME);
      },
      error: (err: HttpErrorResponse) => {
        this.setFormAsyncError(this.getHttpError(err));
      }
    });
  }

  private setFormAsyncError(error: LoginAsyncError) {
    this.loginForm.setErrors(error);
  }

  protected formControlHasErrors(control: AbstractControl) {
    return Object.values(LoginAsyncErrors).find(v => this.loginForm.controls.email.hasError(v as string))
  }

  protected passwordControlValidationMessage() {
    if (this.loginForm.hasError(LoginAsyncErrors.passwordMismatch)) {
      return validationMessage(LoginAsyncErrors.passwordMismatch)
    }

    return '';
  }

  protected emailValidationMessage() {
    if (this.loginForm.hasError(LoginAsyncErrors.emailNotValid)) {
      return validationMessage(LoginAsyncErrors.emailNotValid);
    }

    return '';
  }

  formInvalid(formControl: AbstractControl) {
    return formControl.touched || formControl.dirty || formControl.invalid;
  }

  private getHttpError(error: HttpErrorResponse): LoginAsyncError {
    switch (error.status) {
      case 400:
        return {invalidPassword: true}
      default:
        return {unknownServerError: true}
    }
  }

}
