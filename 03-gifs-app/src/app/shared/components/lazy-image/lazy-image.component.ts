import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: false,
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url! : string;

  @Input()
  public title:  string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url) {
      throw new Error('No url');
    }
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }
}
