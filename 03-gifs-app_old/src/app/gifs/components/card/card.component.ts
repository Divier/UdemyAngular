import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

    @Input()
    public gifIn!: Gif;

    ngOnInit(): void {
      if( !this.gifIn ) {
        throw new Error('Gif property is required');
      }
    }
}
