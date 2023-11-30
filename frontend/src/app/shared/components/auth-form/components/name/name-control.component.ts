import {AfterViewInit, Component, Input} from '@angular/core'
import {AbstractControl, FormControl, Validators} from '@angular/forms'

import {LoginAsyncErrors, validationMessage} from '../../../../../auth/models/login-async-error'
import {setValidators} from '../../../../util/form'

@Component({
  selector: 'app-name',
  templateUrl: './name-control.component.html',
})
export class NameControlComponent implements AfterViewInit {
  @Input() control!: FormControl<string>

  ngAfterViewInit() {
    setValidators(this.control, [Validators.required, Validators.minLength(3)])
  }

  protected emailValidationMessage() {
    if (this.control.hasError(LoginAsyncErrors.emailNotValid)) {
      return validationMessage(LoginAsyncErrors.emailNotValid)
    }

    return ''
  }

  formInvalid(formControl: FormControl) {
    return (formControl.touched || formControl.dirty) && formControl.invalid
  }

  protected formControlHasErrors(control: AbstractControl) {
    return Object.values(LoginAsyncErrors).find((v) => control.hasError(v as string))
  }
}
