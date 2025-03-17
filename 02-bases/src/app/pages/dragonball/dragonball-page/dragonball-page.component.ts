import { Component, computed, signal, WritableSignal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dragonball-page',
  imports: [NgClass],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.css'
})
export class DragonballPageComponent {

  name = signal('');
  power = signal(0);

  characters: WritableSignal<Character[]> = signal([
    {
      id: 1,
      name:'Goku',
      power:9001
    },
    {
      id: 2,
      name:'Vegeta',
      power:8000
    },
    {
      id: 3,
      name:'Piccolo',
      power:5000
    },
    {
      id: 4,
      name:'Yamcha',
      power:500
    }
  ]);

  powerClases = computed( () => {
    return {
      'text-danger': true
    }
  })

  addCharacter() {

    const newCharacter = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update(
      (current) => [...current, newCharacter]
    )
    this.resetForm();
  }

  resetForm() {
    this.name.set('');
    this.power.set(0);
  }
}
