import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from "../../front-navbar/front-navbar.component";

@Component({
  selector: 'app-store-front-layout',
  templateUrl: './store-front-layout.component.html',
  imports: [
    RouterOutlet,
    FrontNavbarComponent
]
})
export class StoreFrontLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
