import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'momentFormat'
})
export class MomentFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'YYYY-MM-DD'): string | null {
    if (!value) return null;
    return moment(value).format(format);
  }

}
