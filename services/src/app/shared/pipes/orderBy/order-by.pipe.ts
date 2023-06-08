import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], property: string): any[] {
    if (!value || !property) {
      return value;
    }
    return value.sort((a, b) => {
      const propertyA = (typeof a[property] === 'string') ? a[property].toLowerCase() : a[property];
      const propertyB = (typeof b[property] === 'string') ? b[property].toLowerCase() : b[property];
      
      if (propertyA < propertyB) {
        return -1;
      } else if (propertyA > propertyB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
