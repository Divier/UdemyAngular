import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(private gifsService: GifsService) {}

  get gifsList(): Gif[] {
    return this.gifsService.gifsLs;
  }
}
