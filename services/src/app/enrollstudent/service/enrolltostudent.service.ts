import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map, Observable } from 'rxjs';
import { Enrolltostudent } from '../class/enrolltostudent';

@Injectable({
  providedIn: 'root'
})
export class EnrolltostudentService {

  enrollmentUrl: string;

  //constructor
  constructor(private _http: HttpClient) {
    this.enrollmentUrl = `${environment.enrollStudentUrl}/enrollstudent/`;
  }

  //service for save enrolled student
  saveEnrolledStudents(enrolltostudent: Enrolltostudent): Observable<any> {
    return this._http.post<any>(this.enrollmentUrl, enrolltostudent);
  }
  getStudentByCourseId(courseId : number) {
    //  alert(this.enrollmentUrl);
   return this._http.get<any>(`${this.enrollmentUrl}courseid/`+ courseId)
   } 


}
