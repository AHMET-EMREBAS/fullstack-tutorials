import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  async login(username: string, password: string) {
    const result: any = await firstValueFrom(
      this.httpClient.post(
        `/api/auth/login/?username=${username}&password=${password}`,
        {}
      )
    );

    console.log(result);

    if (result && result.authToken) {
      localStorage.setItem('authToken', result.authToken);
    }
  }

  logout() {
    localStorage.setItem('authToken', 'Logout');
  }
}
