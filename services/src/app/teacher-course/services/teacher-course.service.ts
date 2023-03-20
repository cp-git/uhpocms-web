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

  //get all courses
  getAllCourses(): Observable<any> {
    return this.http.get<any>(this.courseUrl + "?name=all");
  }

  //add a new course 
  addCourse(course: Course): Observable<any> {
    return this.http.post<any>(this.courseUrl, course);
  }

  //delete a course By ID
  deleteCourseByCourseId(courseId: number): Observable<any> {
    return this.http.delete<any>(this.courseUrl + '/courseId/' + courseId);
  }

  //update a course by ID
  updateCourseById(courseId: number, course: Course): Observable<any> {
    return this.http.put<any>(this.courseUrl + '/courseID/' + courseId, course);
  }

  //get a course by name
  getCourse(courseName: string): Observable<Course> {
    return this.http.get<Course>(this.courseUrl + '/' + courseName);
  }

  //get a course by ID
  getCourseByCourseId(courseId: number): Observable<any> {
    return this.http.get<Course>(this.courseUrl + '/courseId/' + courseId);
  }

  //get all inactive courses
  getAllDeactivateCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}?name=inactive`);
  }

  //activate a course
  activateCourseById(courseId: number): Observable<any> {
    return this.http.patch<any>(`${this.courseUrl}/activate/` + courseId, {});
  }
  //get courses by department ID. 
  getCourseByDepartmentId(deptid: number) {
    return this.http.get<any>(`${this.courseUrl}/deptId/` + deptid)



  }
}
