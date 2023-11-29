import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { RegisterComponent } from './register/register.component'
import { RouterLink } from '@angular/router'

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterLink, SharedModule],
})
export class UsersModule {}
