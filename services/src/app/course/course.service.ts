import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseUrl: string = environment.courseUrl;

  constructor(private _http: HttpClient) {
    this.courseUrl = environment.courseUrl;
  }

  _getAllCourses(): Observable<any> {
    return this._http.get<any>(`${this.courseUrl}/course?name=all`);
  }
}
