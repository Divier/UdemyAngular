import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbar } from '@store-front/components/front-navbar/front-navbar';
//import { FrontNavbar } from "../../components/front-navbar/front-navbar";

@Component({
  selector: 'app-store-front-layout',
  templateUrl: './store-front-layout.html',
  styleUrl: './store-front-layout.css',
  imports: [RouterOutlet, FrontNavbar]
})
export class StoreFrontLayout {

}
