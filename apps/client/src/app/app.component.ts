import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'techbir-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  constructor(public readonly title: Title) {}
}
