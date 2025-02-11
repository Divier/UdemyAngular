import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifService: GifsService) {}

  @ViewChild('refButton')
  public refButton! : ElementRef<HTMLInputElement>;

  getTags(): string[] {
    return this.gifService.tagHistory;
  }

  getGif(tagHistory: string): void {
    this.gifService.searchTag(tagHistory);
  }
}
