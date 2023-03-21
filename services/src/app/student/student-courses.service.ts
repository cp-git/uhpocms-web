import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentCoursesService {

  private baseUrl: string;
  constructor(private _http: HttpClient) {
    //this.baseUrl = `http://localhost:8090/course/uhpocms/course`;
    this.baseUrl = environment.courseUrl;
  }

  //get courses by profile id 
  getCourseByProfileId(profileId: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/profileId/` + profileId);
  }
}
