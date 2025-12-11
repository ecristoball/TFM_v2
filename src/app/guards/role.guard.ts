import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser;

  // roles permitidos se pasan desde la ruta
  const allowedRoles = route.data['roles'] as number[];

  if (user && allowedRoles.includes(user.role_id)) {
    return true;
  }

  // redirigir si no tiene acceso
  router.navigate(['/home']);
  return false;
};
