import { Component, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'techbir-root',
  template: 'router-outlet',
  standalone: true,
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule],
})
export class AppComponent {
  constructor(public readonly title: Title) {}
}
