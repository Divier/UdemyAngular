import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  cacheQueryCapital = new Map<string, Country[]>();
  cacheQueryCountry = new Map<string, Country[]>();
  cacheQueryRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.cacheQueryCapital.has(query)) {
      return of(this.cacheQueryCapital.get(query) ?? []);
    }
    console.log('Consumiendo API Server ...');

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      tap(countries => this.cacheQueryCapital.set(query, countries)),
      delay(2000),
      catchError(error => {
        return throwError(() => new Error('No se pudo obtener paises con ese query'))
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.cacheQueryCountry.has(query)) {
      return of(this.cacheQueryCountry.get(query) ?? []);
    }
    console.log('Consumiendo API Server ...');

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      tap(countries => this.cacheQueryCountry.set(query, countries)),
      delay(2000),
      catchError(error => {
        return throwError(() => new Error('No se pudo obtener paises con ese query'))
      })
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      map(country => country.at(0)),
      catchError(error => {
        return throwError(() => new Error('No se pudo obtener un pais con ese codigo'))
      })
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {

    if(this.cacheQueryRegion.has(region)) {
      return of(this.cacheQueryRegion.get(region) ?? []);
    }
    console.log('Consumiendo API Server ...');

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      tap(countries => this.cacheQueryRegion.set(region, countries)),
      delay(2000),
      catchError(error => {
        return throwError(() => new Error('No se pudo obtener un pais con esa region'))
      })
    );
  }
}
