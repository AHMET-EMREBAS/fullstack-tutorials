import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, of, take, tap } from 'rxjs';

@Component({
  selector: 'techbir-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly httpClient: HttpClient,
    public readonly title: Title
  ) {
    this.httpClient
      .get('api')
      .pipe(
        take(1),
        catchError((err, caught) => {
          return of(err);
        }),
        tap((e) => {
          console.log(e);
        })
      )
      .subscribe(console.log);
  }
}
