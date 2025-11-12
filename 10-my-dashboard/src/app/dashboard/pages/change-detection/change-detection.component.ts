import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  imports: [CommonModule, TitleComponent],
  templateUrl: './change-detection.component.html',
})
export default class ChangeDetectionComponent {

  public frameWorkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  })

  public frameWorkAsProperty = {
    name: 'Angular',
    releaseDate: 2016
  }

  public currentFrameWork = computed(() => {
    return `Change detection - ${this.frameWorkAsSignal().name}`;
  });

  constructor() {
    setTimeout(() => {
      //this.frameWorkAsProperty.name = 'React';
      //console.log('Property changed to React');
      this.frameWorkAsSignal.update( value => ({
        ...value,
        name: 'React'
      }));
      console.log('Signal changed to React');
    }, 2000);
  }
}
