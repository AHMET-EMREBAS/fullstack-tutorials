import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Provider,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

export type NavItem = {
  label: string;
  route: string;
  icon: string;
};

export const NAV_ITEMS = 'NAV_ITEMS';

export function provideNavItems(navItems: NavItem[]): Provider {
  return {
    provide: 'NAV_ITEMS',
    useValue: navItems,
  };
}
@Component({
  selector: 'techbir-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public readonly title: Title,
    @Inject(NAV_ITEMS) public readonly navItems: NavItem[]
  ) {}
}
