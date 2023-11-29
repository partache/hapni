import { Component, DestroyRef } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PostsStep } from '../../../features/models/posts-step'
import { Features } from '../../models/features'
import { UserStep } from '../../../auth/models/user-step'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    isAuth: boolean = false
    constructor(
        private authService: AuthService,
        destroyRef: DestroyRef
    ) {
        this.authService.isAuthenticated$.pipe(takeUntilDestroyed()).subscribe((isAuthenticated) => {
            this.isAuth = isAuthenticated
        })
    }
    logout() {
        this.authService.logout()
    }

    protected readonly PostsStep = PostsStep
  protected readonly Features = Features
  protected readonly UserStep = UserStep
}
