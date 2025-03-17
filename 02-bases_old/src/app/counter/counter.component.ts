import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,

  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  public counter : number = 10;

  increaseBy(value: number) {
    this.counter += value;
  }

  reset() {
    this.counter = 10;
  }
}
