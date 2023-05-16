import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AssignCourseToTeacherService {

  private syllabusUrl: string;
  private assignCourseUrl: string;

  constructor(private _http: HttpClient) {
    this.assignCourseUrl = environment.assignCourseUrl;
    this.syllabusUrl = environment.syllabusUrl;
  }

  //add course syllabus with course id
  addCourseSyllabus(courseSyllabus: Coursesyllabus): Observable<any> {
    return this._http.post<any>(`${this.syllabusUrl}`, courseSyllabus);
  }

  //get assign Course to teacher by profile id 
  getAssignedCourseOfTeacher(teacherId: number): Observable<any> {

    return this._http.get<any>(`${this.assignCourseUrl}/teacherid/` + teacherId);
  }

  //get inactive assigned course to teacher by profile id
  getInactiveAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this._http.get<any>(`${this.assignCourseUrl}/inactive/teacherid/` + teacherId);
  }


}
