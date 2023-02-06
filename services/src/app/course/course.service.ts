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
    return this._http.get<any>("http://localhost:8090/course/uhpocms/course?name=all");
  }

  getCourseByInstitutionId(id: string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/course/uhpocms/course/institutionId/" + id);
  }
}
