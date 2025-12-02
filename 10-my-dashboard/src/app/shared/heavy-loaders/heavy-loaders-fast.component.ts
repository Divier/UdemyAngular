import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-fast',
  imports: [CommonModule],
    template:`
    <section [ngClass]="['w-full', cssClass()]">
      <ng-content></ng-content>
    </section>
  `
})
export class HeavyLoadersFastComponent {

  cssClass = input.required<string>();

  constructor() {
    console.log('HeavyLoadersFastComponent creado');
  }
}
