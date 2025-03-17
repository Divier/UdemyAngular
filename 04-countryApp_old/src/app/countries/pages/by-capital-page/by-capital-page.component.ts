import { Component, EventEmitter, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {
  }

  searchByCapital( term: string): void {
    console.log(term);
    this.countriesService.searchCapital(term).subscribe( countries => {
      this.countries = countries
    });
  }
}
