import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  standalone: false,

  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  @Input()
  public characterList: Character[] = [
    {
      name:' Trunk',
      power: 20000
    }
  ]

  @Output()
  public onDeleteCharacter: EventEmitter<String> = new EventEmitter();

  emitCharacterId(id: String): void {
    console.log(id);
    this.onDeleteCharacter.emit(id);
  }
}
