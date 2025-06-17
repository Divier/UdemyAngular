import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card/card.component";
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe, AsyncPipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canada'
};

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html'
})
export default class UncommonPageComponent {

  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  //i18nSelect
  changeClient() {
    if(this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  //i18nPlural

  clientsMap = signal({
   '=0': 'No tenemos ningun cliente esperando',
   '=1': 'Tenemos un cliente esperando',
   '=2': 'Tenemos 2 clientes esperando',
   other: 'Tenemos # clientes esperando'
  })

  clients = signal([
    'Maria',
    'pedro',
    'Fernando',
    'Melisa',
    'Natalia',
    'Andrea',
    'Juan',
    'carlos'
  ]);

  deleteClient() {
    this.clients.update(prev => prev.slice(1));
  }

  //keyValuePipe
  profile = {
    name: 'Fernando',
    age: 36,
    address: 'Otawa, Canada'
  }

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos Data en la Promesa');
      console.log('Promesa Finalizada'); //si la promesa se resuelve correctamente
      //reject('Tenemos un error en la Data'); // si ocurre un error
    }, 3500);
  });

  // Async Pipe con Observable
  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap:' ,value))
  )
}
