import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '@shared/side-menu/side-menu.component';//Se configura en el tsconfig.json
//import { SideMenuComponent } from '../shared/side-menu/side-menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [SideMenuComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {

}
