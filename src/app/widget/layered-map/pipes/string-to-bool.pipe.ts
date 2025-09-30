import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToBool',
  standalone: false
})
export class StringToBoolPipe implements PipeTransform {
  transform(value?: string) {
    return value === 'true';
  }
}
