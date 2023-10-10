import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { helloWorld } from '@techbir/common';
@Component({
  selector: 'techbir-hello-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent {
  text = helloWorld();
}
