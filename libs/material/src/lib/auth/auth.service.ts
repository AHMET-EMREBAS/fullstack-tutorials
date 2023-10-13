import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { AuthTokenObject } from '@techbir/common';
import { AuthTokenManager } from './auth-token-manager';
import { Router } from '@angular/router';

/**
 * Login path
 * @param username
 * @param password
 * @returns
 */
function createLoginPath(username: string, password: string) {
  return `api/auth/login/?username=${username}&password=${password}`;
}

/**
 * Check user has session or not?
 * @returns
 */
function createHasSessionPath() {
  return `api/auth/has-session`;
}

/**
 * Rxjs Pipe to convert plain object to AuthTokenObject
 * @returns
 */
function toAuthTokenObjectPipe() {
  return map((value: Partial<AuthTokenObject>) => {
    return new AuthTokenObject({ ...value });
  });
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly hasSession$ = this.httpClient.get(createHasSessionPath()).pipe(
    map((e) => true),
    catchError((err, caught) => {
      return of(false);
    })
  );
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  async login(username: string, password: string) {
    const authTokenObject = await firstValueFrom(
      this.httpClient
        .post<AuthTokenObject>(createLoginPath(username, password), {})
        .pipe(toAuthTokenObjectPipe())
    );

    if (authTokenObject) {
      AuthTokenManager.setToken(authTokenObject);
      this.router.navigate(['']);
      location.reload();
    }
  }

  logout() {
    AuthTokenManager.remove();
    this.router.navigate(['auth', 'login']);
    location.reload();
  }

  hasSession() {
    return this.hasSession$;
  }
}
