import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'

import { AuthFormComponent } from './components/auth-form/auth-form.component'
import { EmailControlComponent } from './components/auth-form/components/email-control/email.component'
import { PasswordControlComponent } from './components/auth-form/components/password/password.component'
import { RepeatPasswordControlComponent } from './components/auth-form/components/repeat-password/repeat-password.control'
import { FooterComponent } from './components/footer/footer.component'
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component'
import { HeaderComponent } from './components/header/header.component'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { JwtInterceptor } from './interceptors/jwt.interceptor'
import { FormControlPipe } from './pipe/form-control.pipe'

@NgModule({
    declarations: [
        FormControlErrorComponent,
        HeaderComponent,
        FooterComponent,
        AuthFormComponent,
        FormControlPipe,
        EmailControlComponent,
        PasswordControlComponent,
        RepeatPasswordControlComponent,
    ],
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    exports: [
        FormControlErrorComponent,
        HeaderComponent,
        FooterComponent,
        AuthFormComponent,
        FormControlPipe,
        EmailControlComponent,
        PasswordControlComponent,
        RepeatPasswordControlComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
