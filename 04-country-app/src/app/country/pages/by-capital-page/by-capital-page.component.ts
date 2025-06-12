import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  /* Forma Tradicional de hacer una peticion http */

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(value: string) {
  //   //console.log(value);
  //   if(this.isLoading()) {
  //     return;
  //   }
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(value)
  //   /*.subscribe(countries => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //   });*/
  //   .subscribe({
  //     next : (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error : (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([])
  //       this.isError.set(err)
  //     }
  //   }) // Es equivalente al subscribe anterior solo que este ultimo tiene el manejo de error
  // }

  /* Reactividad asincrónica con recursos */

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  /* Este resource trabaja retornando una promise */
  // countryResource = resource({
  //   request : () => ({ query : this.query()}),
  //   loader : async({request}) => {
  //     if(!request.query) {
  //       return [];
  //     }
  //     return await firstValueFrom(this.countryService.searchByCapital(request.query));
  //   }
  // })

  /* Este resource trabaja retornando un Observable */
  countryResource = rxResource({
    request : () => ({ query : this.query()}),
    loader : ({request}) => {
      if(!request.query) {
        return of([]);
      }
      this.router.navigate(['/country/by-capital'], {
        queryParams : {
          query : request.query,
          prueba: 'hola'
        }
      })
      return this.countryService.searchByCapital(request.query);
    }
  })
}
