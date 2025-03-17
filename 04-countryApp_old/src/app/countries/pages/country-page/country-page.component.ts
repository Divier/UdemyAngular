import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  standalone: false,
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {

  constructor(
    private countriesService: CountriesService,
    private activeRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.activeRoute.params
    .subscribe( ( {id} ) => {
      this.countriesService.searchCountryByAlphaCode(id)
      .subscribe( (country) => {
        console.log(country)
      })
    })



  }
}
