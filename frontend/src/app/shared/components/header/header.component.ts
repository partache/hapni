import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(takeUntilDestroyed())
      .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
  }

}
