import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideNavItems } from '../app-layout';

@Component({
  selector: 'techbir-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [
    provideNavItems([{ label: 'Users', icon: 'person', route: 'users' }]),
  ],
})
export class AuthComponent {}
