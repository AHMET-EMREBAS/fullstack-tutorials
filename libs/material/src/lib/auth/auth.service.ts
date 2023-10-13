import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { AuthTokenObject } from '@techbir/common';
import { AuthTokenManager } from './auth-token-manager';

function createLoginPath(username: string, password: string) {
  return `/api/auth/login/?username=${username}&password=${password}`;
}

function toAuthTokenObject() {
  return map((value: Partial<AuthTokenObject>) => {
    return new AuthTokenObject({ ...value });
  });
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  async login(username: string, password: string) {
    const authTokenObject = await firstValueFrom(
      this.httpClient
        .post<AuthTokenObject>(createLoginPath(username, password), {})
        .pipe(toAuthTokenObject())
    );

    AuthTokenManager.setToken(authTokenObject);
  }

  logout() {
    AuthTokenManager.remove();
  }
}
