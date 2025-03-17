import { CommonModule } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-hero-page',
  imports: [CommonModule],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent {

  name: WritableSignal<string> = signal('');
  age: WritableSignal<number> = signal(0);

  heroDescription = computed( () => {
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  })

  getHeroDescription() {
    return `${ this.name() } - ${ this.age() }`;
  }

  changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }

  changeAge() {
    this.age.set(60);
  }
}
