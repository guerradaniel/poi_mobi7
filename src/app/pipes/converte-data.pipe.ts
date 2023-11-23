import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'converteData'
})
export class ConverteDataPipe extends DatePipe implements PipeTransform {

  override transform(value: any, ...args: any[]): any {
    return super.transform(value, 'MM/dd/yyyy');
  }
}
