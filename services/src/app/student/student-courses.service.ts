import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {

  constructor(private _http: HttpClient) { }

  getCourseByProfileId(id: number): Observable<any> {
    return this._http.get<any>("http://localhost:8080/uhpocms/course/profileId/" + id);
  }
}
