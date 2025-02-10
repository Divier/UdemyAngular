import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) { }

  private apiKey: string = 'oZRIFvniIVCqZYUHHs7cxlvvJ377qGwz';
  private serviceUrl = 'https://api.giphy.com/v1/channels';
  private _tagHistory: string[] = [];

  get tagHistory() {
    return [...this._tagHistory];
  }

  public searchTag(tag: string): void {
    //this._tagHistory.unshift(tag);
    if(tag.trim().length === 0) {
      return;
    }
    this.validateTagHistory(tag);

    const params = new HttpParams()
    .set('apiKey', this.apiKey)
    .set('limit', 10)
    .set('q', tag);

    this.http.get( `${ this.serviceUrl }/search`, { params : params } )
    .subscribe( resp => {
      console.log(resp);
    });
  }

  private validateTagHistory(tag: string) {

    tag = tag.toLowerCase();
    this._tagHistory = this._tagHistory.filter( (tagH) => tagH !== tag);
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.slice(0, 10);
  }
}
