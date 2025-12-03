import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  template: `
    <app-title [title]="titleLabel()"></app-title>
    @if (user()) {
      <section>
        <img
          [srcset]="user()!.avatar"
          alt="user()!.first_name"
        >
        <div>
          <h3>{{ user()!.first_name }} {{ user()!.last_name }}</h3>
          <p>{{ user()!.email }}</p>
        </div>
      </section>
    } @else {
      <p>Cargando informacion ...</p>
    }
    `
})
export default class UserComponent {

  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  user = toSignal(
    this.route.params
    .pipe(
      switchMap(
        params => this.usersService.getUserById(params['id'])
      )
    )
  );

  titleLabel = computed(() => {
    if(this.user()) {
      return this.user()?.first_name + ' ' + this.user()?.last_name
    } else {
      return 'Cargando Informacion del Usuario...'
    }
  });
}
