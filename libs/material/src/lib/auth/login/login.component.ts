import { Component } from '@angular/core';
import { MaterialModule } from '../../material';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'techbir-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
      await this.authService.login(username, password);
    }
  }
}
