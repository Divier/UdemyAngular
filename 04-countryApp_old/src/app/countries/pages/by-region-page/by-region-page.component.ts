import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  standalone: false,
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {
  }

  searchByRegion( term: string): void {
    console.log(term);
    this.countriesService.searchRegion(term).subscribe( countries => {
      this.countries = countries
    });
  }
}
