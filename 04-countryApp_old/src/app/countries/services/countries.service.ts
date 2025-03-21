import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      catchError( () => of([]) )
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    .pipe(
      catchError( () => of([]) )
    );
  }

  searchCountry(term: string): Observable<Country[]>  {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${term}`)
    .pipe(
      catchError( () => of([]) )
    );
  }

  searchRegion(term: string): Observable<Country[]>  {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${term}`)
    .pipe(
      catchError( () => of([]) )
    );
  }
}
