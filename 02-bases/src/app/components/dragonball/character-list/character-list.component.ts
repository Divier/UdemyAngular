import { Component, input, signal, WritableSignal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {

    characters = input.required<Character[]>();
    listName = input<string>();
}
