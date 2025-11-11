import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A' | 'B' | 'F';

@Component({
  selector: 'app-control-flow',
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
})
export default class ControlFlowComponent {

  public showContent = signal(false);
  public grade = signal<Grade>('B');

  public frameWorks = signal<string[]>(['Angular', 'React', 'Vue', 'Svelte', 'Ember']);

  public frameWorks2 = signal<string[]>([]);

  public toggleContent() {
    this.showContent.update(value => !value);
  }
}
