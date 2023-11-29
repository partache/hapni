import {Component, DestroyRef, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PostsStep} from "../../../features/models/posts-step";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  isAuth: boolean = false;
  constructor(private authService: AuthService, destroyRef: DestroyRef) {
    this.authService.isAuthenticated$
        .pipe(takeUntilDestroyed())
        .subscribe(isAuthenticated => {
          this.isAuth = isAuthenticated;
        });
  }
  logout() {
    this.authService.logout();
  }

  protected readonly PostsStep = PostsStep;
}
