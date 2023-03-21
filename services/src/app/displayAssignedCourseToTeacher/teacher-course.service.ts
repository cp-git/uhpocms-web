import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseService {

  private syllabusUrl: string;
  private assignCourseUrl: string;

  constructor(private _http: HttpClient) {
    this.assignCourseUrl = `http://localhost:8090/course/uhpocms/course`;
    this.syllabusUrl = `http://localhost:8090/courseSyllabus/uhpocms/courseSyllabus`;
  }

  //add course syllabus with course id
  addCourseSyllabus(courseSyllabus: Coursesyllabus): Observable<any> {
    return this._http.post<any>(`${this.syllabusUrl}`, courseSyllabus);
  }

  //get assign Course to teacher by profile id 
  getAssignedCourseToTeacher(teacherId: number): Observable<any> {

    return this._http.get<any>(`${this.assignCourseUrl}/teacherid/` + teacherId);
  }

  //get inactive assigned course to teacher by profile id
  getInactiveAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this._http.get<any>(`${this.assignCourseUrl}/inactive/teacherid/` + teacherId);
  }


}
