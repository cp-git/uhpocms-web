import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {

  private baseUrl: string;
  constructor(private _http: HttpClient) {
    this.baseUrl = `http://localhost:8090/course/uhpocms/course`;
  }

  //get courses by profile id 
  getCourseByProfileId(profileId: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/profileId/` + profileId);
  }
}
