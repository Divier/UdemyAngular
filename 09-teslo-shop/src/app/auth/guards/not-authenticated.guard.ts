import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth-service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {

  console.log('NotAuthenticatedGuard invoked');

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkStatus());
  console.log('isAuthenticated:', isAuthenticated);

  if (isAuthenticated) {
    await router.navigateByUrl('/');
    return false; //Como ya está autenticado no es necesario redirigirlo al login
  }
  return true;
}
