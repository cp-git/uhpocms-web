import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';

import { Course } from '../course';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseService {

  private courseUrl: string = environment.courseUrl;

  constructor(private http: HttpClient) {
    this.courseUrl = `${environment.courseUrl}/course`;
  }

  getAllCourses(): Observable<any> {
    return this.http.get<any>(this.courseUrl + "?name=all");
  }

  addCourse(course: Course): Observable<any> {
    return this.http.post<any>(this.courseUrl, course);
  }

  deleteCourseByCourseId(courseId: number): Observable<any> {
    return this.http.delete<any>(this.courseUrl + '/courseId/' + courseId);
  }

  updateCourseListById(courseId: number, course: Course): Observable<any> {
    return this.http.put<any>(this.courseUrl + '/courseID/' + courseId, course);
  }

  getCourse(courseName: string): Observable<Course> {
    return this.http.get<Course>(this.courseUrl + '/' + courseName);
  }

  getCourseByCourseId(courseId: number): Observable<any> {
    return this.http.get<Course>(this.courseUrl + '/courseId/' + courseId);
  }

  getAllDeactivateCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}?name=inactive`);
  }

  activateCourseById(courseId: number): Observable<any> {
    return this.http.patch<any>(`${this.courseUrl}/activate/` + courseId, {});
  }
  getCourseByDepartmentId(deptid: number) {
    return this.http.get<any>(`${this.courseUrl}/deptId/` + deptid)



  }
}
