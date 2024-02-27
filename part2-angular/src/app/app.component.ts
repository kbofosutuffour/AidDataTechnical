import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { card } from './card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, OutputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'part2-angular';
  cards: card[] = [];

  
}
