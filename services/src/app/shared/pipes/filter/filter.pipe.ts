import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any[] {

    if (!items) return [];
    if (value == undefined || value == null || value == 'undefined') return items;

    return items.filter(item =>
      item[field] == value
    );
  }
}
