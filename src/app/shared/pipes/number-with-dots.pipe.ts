import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithDots',
  standalone: true
})
export class NumberWithDotsPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    const integerPart = Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return integerPart;
  }

}
