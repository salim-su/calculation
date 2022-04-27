import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defNum'
})
export class DefNumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value < 0) {
      return '-';
    }
    return value;
  }

}
