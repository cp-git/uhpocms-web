import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseService {

  constructor(private _http: HttpClient) { }

  getAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this._http.get<any>("http://localhost:8090/course/uhpocms/course/teacherid/" + teacherId);
  }

  getInactiveAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this._http.get<any>("http://localhost:8090/course/uhpocms/course/inactive/teacherid/" + teacherId);
  }
}
