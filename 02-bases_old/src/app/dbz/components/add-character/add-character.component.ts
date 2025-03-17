import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-add-character',
  standalone: false,

  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css'
})
export class AddCharacterComponent {

  public character: Character = {
    name:'',
    power:0
  }

  @Output()
  public onNewCharacter : EventEmitter<Character> = new EventEmitter();

  emitCharacter(): void {
    this.onNewCharacter.emit(this.character);
    this.character = {
      name: '',
      power: 0
    }
  }
}
