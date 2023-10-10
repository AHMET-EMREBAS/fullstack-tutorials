import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { byeWorld } from '@techbir/common';

@Component({
  selector: 'techbir-bye-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bye-world.component.html',
  styleUrls: ['./bye-world.component.scss'],
})
export class ByeWorldComponent {
  text = byeWorld();
}
