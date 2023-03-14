import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseService {

  private syllabusUrl: string;
  constructor(private _http: HttpClient) {
    this.syllabusUrl = `http://localhost:8090/courseSyllabus/uhpocms/courseSyllabus`;
  }

  addCourseSyllabus(courseSyllabus: Coursesyllabus): Observable<any> {

    return this._http.post<any>(`${this.syllabusUrl}`, courseSyllabus);
  }
  getAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this._http.get<any>("http://localhost:8090/course/uhpocms/course/teacherid/" + teacherId);
  }

  getInactiveAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this._http.get<any>("http://localhost:8090/course/uhpocms/course/inactive/teacherid/" + teacherId);
  }


}
