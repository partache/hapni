import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {NgModule} from "@angular/core";
import {FormControlErrorComponent} from "./components/form-control-error/form-control-error.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [FormControlErrorComponent, HeaderComponent, FooterComponent, AuthFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormControlErrorComponent, HeaderComponent, FooterComponent, AuthFormComponent],
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
