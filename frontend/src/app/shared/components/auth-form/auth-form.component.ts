import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {emailValidator, passwordMatchValidator} from "../../util/validators";
import {LoginAsyncError, LoginAsyncErrors, validationMessage} from "../../../auth/models/login-async-error";
import {UserStep} from "../../../auth/models/user-step";


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent implements AfterViewInit {
  @Input() isLogin = true;
  @Input() asyncErrors?: LoginAsyncError;
  @Output() submitForm = new EventEmitter<unknown>();

  protected readonly UserStep = UserStep;

  loginForm = this.fb.group({
    email: ['', Validators.required, emailValidator],
    password: ['', Validators.required, Validators.minLength(5)],
    repeatPassword: ['']
  });


  constructor(
    private fb: NonNullableFormBuilder) {
  }

  ngAfterViewInit() {
    if (!this.isLogin) {
      this.addControl();
    }
  }

  private addControl(): void {
    this.loginForm = this.fb.group({
      ...this.loginForm.controls,
      repeatPassword: ['', Validators.required, Validators.minLength(5), passwordMatchValidator]
    });
    // this.loginForm.addControl('repeatPassword', this.fb.control(['', Validators.required, Validators.minLength(5), passwordMatchValidator]));
  }

  submit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }
    const {email, password, repeatPassword} = this.loginForm.getRawValue();
    this.submitForm.emit({email, password, repeatPassword});
  }

  protected formControlHasErrors(control: AbstractControl) {
    return Object.values(LoginAsyncErrors).find(v => control.hasError(v as string))
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

}
