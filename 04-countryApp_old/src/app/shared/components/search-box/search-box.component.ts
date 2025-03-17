import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @Input()
  public placeHolder: string = '';

  @Output()
  public term : EventEmitter<string> = new EventEmitter();

  /*@ViewChild('find')
  public txtTagInput! : ElementRef<HTMLInputElement>;

  onValue(): void {
    this.term.emit(this.txtTagInput.nativeElement.value);
    this.txtTagInput.nativeElement.value = '';
  }*/

  onValue(term: string): void {
    this.term.emit(term);
  }
}
