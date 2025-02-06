import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: false,

  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  public heroes : string[] = ['Spiderman', 'Ironman', 'Hulk', 'She Hulk', 'Thor'];
  public heroeBorrado? : string;

  borrarHeroe() {
    this.heroeBorrado = this.heroes.pop();
  }
}
