import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituteservicesService {

  private courseUrl: string = environment.courseUrl;

  constructor(private _http: HttpClient) {
    this.courseUrl = environment.courseUrl+'/course';
  }

  // get all courses
  _getAllCourses(): Observable<any> {
    return this._http.get<any>(`${this.courseUrl}?name=all`);
  }

  //get course by Institutionid
  getCourseByInstitutionId(id: string): Observable<any> {
    return this._http.get<any>(`${this.courseUrl}/institutionId/`+ id);
  }

  //get course by departmentId
  getCourseByDepartmentId(deptid: string) {
    return this._http.get<any>(`${this.courseUrl}/departmentId/` + deptid)
  }
}
