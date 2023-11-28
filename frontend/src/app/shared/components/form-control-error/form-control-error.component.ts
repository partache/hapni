import {AfterViewInit, Component, Input} from "@angular/core";
import {AbstractControl, FormControl} from "@angular/forms";
import {LoginAsyncErrors} from "../../../auth/login/models/login-async-error";


@Component(({
  selector: 'app-error',
  template: `
    <span *ngIf="formControlHasErrors(control)">
        <span class="text-red">{{validationMessage}}</span>
      </span>
  `
}))
export class FormControlErrorComponent implements AfterViewInit {
  @Input() control!: FormControl<string>;

  @Input() asyncErrors!: LoginAsyncErrors;

 @Input() validationMessage!: string;

  ngAfterViewInit() {
  }

  protected formControlHasErrors(control: AbstractControl) {
    return Object.values(this.asyncErrors).find(v => this.control.hasError(v as string))
  }

}
