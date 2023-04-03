import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any[] {
    alert(value)
    if (!items) return [];
    if (!value) return items;

    return items.filter(item =>
      value.includes(item[field])
    );
  }

}
