import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {RoutingService} from "../services/routing.service";
import {Features} from "../models/features";
import {UserStep} from "../../auth/models/user-step";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(RoutingService);
  if (authService.isAuthUser()) {
    return true;
  } else {
    router.navigateToStep(Features.USERS, UserStep.LOGIN);
    return false;
  }
};
