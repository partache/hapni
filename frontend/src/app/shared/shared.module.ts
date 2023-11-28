import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {NgModule} from "@angular/core";
import {FormControlErrorComponent} from "./components/form-control-error/form-control-error.component";


@NgModule({
  declarations: [FormControlErrorComponent],
  imports: [
    CommonModule
  ],
  exports: [FormControlErrorComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class SharedModule {
}
