import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css'
})
export class CharacterAddComponent {

  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();

  addCharacter() {

    const newCharacter = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power()
    }

    console.log({newCharacter});
    this.newCharacter.emit(newCharacter);
    this.resetForm();
  }

  resetForm() {
    this.name.set('');
    this.power.set(0);
  }
}
