import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'techbir-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public readonly title: Title) {}
}
