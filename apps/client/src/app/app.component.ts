import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'techbir-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  ngOnInit(): void {
    const source = new EventSource('http://localhost:3000/api/sse');

    source.onopen = () => {
      console.log('Opened SSE');
    };

    source.onerror = () => {
      console.log('Something went wrong!');
    };

    source.onmessage = (args:MessageEvent ) => {
      console.log(args.data);
    };
  }
}
