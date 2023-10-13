import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Auhentication Guard.
 * When we apply to this guard to route, then only authenticated users can access that route content.
 * @returns
 */
export const AuthGuard: CanActivateFn = () => {
  return inject(AuthService).hasSession();
};
