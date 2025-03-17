import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { CharacterListComponent } from "../../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../../components/dragonball/character-add/character-add.component";
import { DragonballService } from '../../../services/dragonball.service';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.css'
})
export class DragonballSuperPageComponent {

  public dragonBallService = inject(DragonballService);
}
