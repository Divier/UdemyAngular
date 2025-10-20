import { toSignal } from '@angular/core/rxjs-interop';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs-service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gif-history-page',
  imports: [GifsListComponent],
  templateUrl: './gif-history-page.component.html',
  styleUrl: './gif-history-page.component.css'
})
export default class GifHistoryPageComponent {

  gifService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
