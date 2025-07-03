import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-front-navbar',
  templateUrl: './front-navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class FrontNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
