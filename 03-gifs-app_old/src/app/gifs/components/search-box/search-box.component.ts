import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: false,
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchGif()"
      #txtTagInput
    >
  `
})
export class SearchBoxComponent {

  constructor(private gifService: GifsService) {

  }

  @ViewChild('txtTagInput')
  public txtTagInput! : ElementRef<HTMLInputElement>;

  searchGif() {
    const tag = this.txtTagInput.nativeElement.value;
    this.gifService.searchTag(tag);
  }
}

