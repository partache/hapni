import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'

import { UserStep } from '../../auth/models/user-step'
import { Features } from '../models/features'
import { AuthService } from '../services/auth.service'
import { RoutingService } from '../services/routing.service'

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService)
    const router = inject(RoutingService)
    if (authService.isAuthUser()) {
        return true
    } else {
        router.navigateToStep(Features.USERS, UserStep.LOGIN)
        return false
    }
}
