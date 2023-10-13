import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'techbir-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginForm = this.formBuilder.group({
    username: [],
    password: [],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  async login() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      console.log('Login ...........');
      await this.authService.login(username, password);
    }
  }
}
