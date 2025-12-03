import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserResponse, UsersResponse } from '@interfaces/req-response';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  #state = signal<State>({
    users: [],
    loading: true
  });

  users = computed(() => this.#state().users);
  loading = computed(() => this.#state().loading);

  constructor() {
    console.log('Cargando Data');
    this.http.get<UsersResponse>('https://reqres.in/api/users', { headers: { 'x-api-key': 'reqres_22d9ef2e3fa54cb6bab420c47a87cb70' } })
    .pipe(delay(1500))
    .subscribe( res => {
      this.#state.set({
        users: res.data,
        loading: false
      })
    })
  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`, { headers: { 'x-api-key': 'reqres_22d9ef2e3fa54cb6bab420c47a87cb70' } })
    .pipe(
      delay(1000),
      map(res => res.data)
    )
  }
}
