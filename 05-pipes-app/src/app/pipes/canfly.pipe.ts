import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly'
})
export class CanflyPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Puede Volar' : 'No Puede Volar';
  }
}
