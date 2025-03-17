import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadLocalStorage = () : Character[] => {
  const characters = localStorage.getItem("dbCharacters");
  return characters ? JSON.parse(characters) : [];
}

@Injectable({
  providedIn: 'root'
})
export class DragonballService {

  constructor() { }

  characters: WritableSignal<Character[]> = signal(loadLocalStorage());

    powerClases = computed(() => {
      return {
        'text-danger': true
      }
    })

    saveToLocalStorage = effect(() => {
      localStorage.setItem("dbCharacters", JSON.stringify(this.characters()))
    })

    addCharacter(newCharacter: Character) {

      this.characters.update(
        (current) => [... current, newCharacter]
      )
    }
}
