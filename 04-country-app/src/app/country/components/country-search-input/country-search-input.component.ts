import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html'
})
export class CountrySearchInputComponent {

  placeholder = input('Buscar');
  debounceTime = input(1000);
  initialValue = input<string>();

  value = output<string>();

  //inputValue = signal<string>(this.initialValue());
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, 1000);

    onCleanup(() => {
      clearTimeout(timeOut);
    })
  })
}
