import { Injectable, signal } from '@angular/core';

export type AvailableLocale = 'es' | 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private currentLocale = signal<AvailableLocale>('es');

  constructor() {
    this.currentLocale.set(
      (localStorage.getItem('local') as AvailableLocale) ?? 'es'
    )
  }

  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: AvailableLocale) {
    localStorage.setItem('local', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }
}
