import { Component, inject } from '@angular/core';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-users.component',
  imports: [TitleComponent, RouterLink],
  templateUrl: './users.component.html',
})
export default class UsersComponent {

  public usersService = inject(UsersService);

}
