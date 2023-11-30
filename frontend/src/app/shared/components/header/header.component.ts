import {Component, DestroyRef} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {PostsStep} from '../../../features/models/posts-step'
import {Features} from '../../models/features'
import {UserStep} from '../../../auth/models/user-step'
import {RoutingService} from "../../services/routing.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isAuth!: boolean | string;

  constructor(
    private authService: AuthService,
    private router: RoutingService,
    destroyRef: DestroyRef
  ) {
    this.authService.isAuthenticated$.pipe(takeUntilDestroyed()).subscribe((isAuthenticated) => {
      this.isAuth = (this.authService.isAuthUser() || isAuthenticated);
    })
  }

  logout() {
    this.authService.logout().subscribe({
        next: () => {
          this.router.navigateToStep(Features.POSTS, PostsStep.CATALOG)
        },
        error: () => this.router.navigateToErrorPage()
      })
  }

  protected readonly PostsStep = PostsStep
  protected readonly Features = Features
  protected readonly UserStep = UserStep
}
