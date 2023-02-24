import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {

  constructor(private _http: HttpClient) { }

  getCourseByProfileId(profileId: number): Observable<any> {
    return this._http.get<any>("http://localhost:8090/course/uhpocms/course/profileId/" + profileId);
  }
}
