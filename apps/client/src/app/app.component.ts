import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import {
  AuthService,
  ConfirmDialogComponent,
  ConfirmDialogData,
  ConfirmDialogResult,
} from '@techbir/material';
import { firstValueFrom, map, tap } from 'rxjs';

@Component({
  selector: 'techbir-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$ = this.router.events.pipe(
    map((e: any) => {
      if (e instanceof NavigationEnd) {
        return true;
      }
      return false;
    })
  );
  notHaveSession$ = this.authService.hasSession$.pipe(
    tap((hasSession) => {
      if (hasSession) {
        this.router.navigate(['todo']);
      } else {
        this.router.navigate(['auth', 'login']);
      }
    }),
    map((e) => !e)
  );

  constructor(
    public readonly title: Title,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async logout() {
    const openedDialog = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogData({ message: 'Are you sure to logout?' }),
    });

    const dialogResult = await firstValueFrom<ConfirmDialogResult>(
      openedDialog.afterClosed()
    );

    if (dialogResult === true) {
      this.authService.logout();
      this.router.navigate(['']);
    }
  }
}
