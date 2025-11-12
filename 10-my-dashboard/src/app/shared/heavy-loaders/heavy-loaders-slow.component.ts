import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  imports: [CommonModule],
  template:`
    <section [ngClass]="['w-full h-[600px]', cssClass()]">
      Heavy Loader Slow
    </section>
  `
})
export class HeavyLoadersSlowComponent {

  //@Input({ required: true }) cssClass!: string;

  cssClass = input.required<string>();

  constructor() {

    const start = Date.now();
    while( Date.now() - start < 3000 ) {}

    console.log('Cargado');
  }
}
