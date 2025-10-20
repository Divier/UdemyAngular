import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs'

const loadGifFromLocalStorage = () => {
  const gifFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';//Record<string, Gif[]>
  const gifs = JSON.parse(gifFromLocalStorage);
  return gifs;
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);
  //trendingGifs: WritableSignal<Gif[]> = signal([]);
  trendingGifs = signal<Gif[]>([]);//Es equivalente a la linea anterior

  trendingGifsLoading = signal(false);

  trendingGifsPage = signal(0);

  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3))
    }
    console.log(groups);

    return groups;
  })

  searchHistory = signal<Record<string, Gif[]>>(loadGifFromLocalStorage());

  searchHistoryKeys = computed( () => Object.keys(this.searchHistory()));

  saveToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    if(this.trendingGifsLoading()) {
      return;
    }
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,
        offset: this.trendingGifsPage() * 20
      }
    }).subscribe((resp) => {
      console.log(resp);
      const gif = GifMapper.mapGiphyItemToGifArray(resp.data);
      console.log(gif);
      this.trendingGifs.update( currentGifs => [ ...currentGifs, ...gif ]);
      this.trendingGifsPage.update( currentValue => currentValue + 1);
      this.trendingGifsLoading.set(false);
    })
  }

  searchGif(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map((resp) => GifMapper.mapGiphyItemToGifArray(resp.data)),
      tap((resp) => {
        this.searchHistory.update((gifHistory) => ({
          ...gifHistory,
          [query.toLowerCase()]: resp
        }));
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query];
  }
}
