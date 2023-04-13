import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'advFilter'
})
export class AdvFilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any[] {

    if (!items || value == 'undefined') return [];
    if (value === null || value === 'undefined') return items;

    return items.filter(item =>
      item[field] === value
    );
  }
}
