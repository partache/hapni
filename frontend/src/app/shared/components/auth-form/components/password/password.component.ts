import {AfterViewInit, Component, Input} from '@angular/core'
import { AbstractControl, FormControl, Validators } from '@angular/forms'

import { LoginAsyncErrors, validationMessage } from '../../../../../auth/models/login-async-error'
import { setValidators } from '../../../../util/form'
import { emailValidator } from '../../../../util/validators'

@Component({
    selector: 'app-pass',
    templateUrl: './password.component.html',
})
export class PasswordControlComponent implements AfterViewInit {
    @Input() control!: FormControl<string>

    ngAfterViewInit() {
        setValidators(this.control, [Validators.required])
    }

    formInvalid(formControl: FormControl) {
        return (formControl.touched || formControl.dirty) && formControl.invalid
    }

    protected formControlHasErrors(control: AbstractControl) {
        return Object.values(LoginAsyncErrors).find((v) => control.hasError(v as string))
    }

    protected passwordControlValidationMessage() {
        if (this.control.hasError(LoginAsyncErrors.passwordMismatch)) {
            return validationMessage(LoginAsyncErrors.passwordMismatch)
        }

        return ''
    }
}
