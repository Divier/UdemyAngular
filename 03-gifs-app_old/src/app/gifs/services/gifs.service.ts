import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private apiKey: string = 'oZRIFvniIVCqZYUHHs7cxlvvJ377qGwz';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private _tagHistory: string[] = [];
  private gifsList: Gif[] = [];

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  get gifsLs(): Gif[] {
    return this.gifsList;
  }

  public searchTag(tag: string): void {
    //this._tagHistory.unshift(tag);
    if(tag.trim().length === 0) {
      return;
    }
    this.validateTagHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag);

    this.http.get<SearchGIFResponse>( `${ this.serviceUrl }/search`, { params : params } )
    .subscribe( resp => {
      this.gifsList = resp.data;
      //console.log({gifs: this.gifsList});
    });
  }

  private validateTagHistory(tag: string) {

    tag = tag.toLowerCase();
    this._tagHistory = this._tagHistory.filter( (tagH) => tagH !== tag);
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.slice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) {
      return;
    }
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagHistory.length === 0) {
      return;
    }
    this.searchTag(this._tagHistory[0]);
  }
}
