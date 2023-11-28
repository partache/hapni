import {AbstractControl, ValidatorFn} from "@angular/forms";

export function setValidators(control: AbstractControl, validators: ValidatorFn) {
  control.setValidators(validators);
  setTimeout(() => control.updateValueAndValidity(), 0)
}
