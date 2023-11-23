import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoPeriodo'
})
export class FormatoPeriodoPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let days = `${value.days} dia${value.days !== 1 ? `s` : `` }`;
    let hours = `${value.hours} hora${value.hours !== 1 ? `s` : `` }`;
    let minutes = `${value.minutes} minuto${value.minutes !== 1 ? `s` : `` }`;
    let seconds = `${value.seconds} segundo(s)`;
    
    return `${ value.days !== 0 ? `${days}, ` : `` } ${ value.hours !== 0 ? `${hours}, ` : `` }
            ${ value.minutes !== 0 ? `${minutes}, ` : `` } ${ value.seconds !== 0 ? `${seconds}. ` : `` }`;
  }
}
