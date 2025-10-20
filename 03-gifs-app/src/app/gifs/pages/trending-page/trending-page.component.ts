import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs-service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

/*const imageUrls: string[] = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
];*/

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css'
})
export default class TrendingPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {

    const scrollDiv =  this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) {
      return;
    }
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  //imagesUrl : string[] = imageUrls; // Se puede trabajar asi
  //imagesUrl = signal(imageUrls); // O Se puede trabajar como una señal

  gifsService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    //console.log(event);
    const scrollDiv =  this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) {
      return;
    }

    /*Para configurar un infinity scroll*/
    const scrollTop = scrollDiv.scrollTop; //Valor del scroll que se ha hecho hacia abajo
    const clientHeight = scrollDiv.clientHeight; //Valor de la altura del viewpont
    const scrollHeight = scrollDiv.scrollHeight; //Altura total del elemento

    const isAtBottom = scrollTop + clientHeight >= scrollHeight;//Con este calculo se determina si ya se hizo scroll hasta el final
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(isAtBottom) {
      // TODO:Cargar los siguientes guifs
      this.gifsService.loadTrendingGifs();
    }
  }
}
