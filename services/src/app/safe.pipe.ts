import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser";
import { Profile } from './profiles/class/profile';
import { Course } from './teacher-course/class/course';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
