import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  imports: [],
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {

  counter: number = 10;
  counterSignal = signal(10);

  /*constructor() {
    setInterval( () => {
      this.increaseBy(1);
      //this.counter += 1;
      console.log('Tick');
    }, 2000)
  }*/

  increaseBy(value:number):void {
    this.counter += value;
    this.counterSignal.update( (currentValue) => currentValue + value );
  }

  decreaseBy(value:number):void {
    this.counter -= value;
    this.counterSignal.update( (currentValue) => currentValue - value );
  }

  reset():void {
    this.counter = 10;
    this.counterSignal.set(0);
  }
}
