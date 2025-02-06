import { Component } from '@angular/core';
import { DbzService } from '../services/dbz.service';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-main-page-component',
  standalone: false,

  templateUrl: './main-page-component.component.html',
  styleUrl: './main-page-component.component.css'
})
export class MainPageComponentComponent {

  constructor(private dbzService: DbzService) {

  }

  get characters(): Character[] {
    return [...this.dbzService.characters];
  }

  onDeleteCharacter( id: String ):void {
    this.dbzService.onDeleteCharacter( id );
  }

  onNewCharacter( character: Character ):void {
    this.dbzService.onNewCharacter( character );
  }
}
