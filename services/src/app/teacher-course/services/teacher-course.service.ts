import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment.development';

import { Course } from '../class/course';
import { CourseDepartment } from '../class/course-department';
import { Coursesyllabus } from 'app/class/coursesyllabus';
import { DataServiceCache } from 'app/cache/service/data-service.service';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseService {

  private courseDepartmentUrl: string = environment.courseDepartmentUrl;
  private courseUrl: string = environment.courseUrl;
  private syllabusUrl: string;
  private assignCourseUrl: string;

  constructor(private http: HttpClient, private cache: DataServiceCache) {
    this.courseUrl = `${environment.courseUrl}/course`;
    this.courseDepartmentUrl = `${environment.courseDepartmentUrl}/course`;
    this.assignCourseUrl = environment.assignCourseUrl;
    this.syllabusUrl = environment.syllabusUrl;
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
    const cachedData = this.cache.getDataFromCache(this.courseUrl + '/courseId/' + courseId);
    if (cachedData) {
      return of(cachedData);
    }


    return this.http.get<Course>(this.courseUrl + '/courseId/' + courseId).pipe(
      tap(data => this.cache.setDataInCache(this.courseUrl + '/courseId/' + courseId, data))
    );
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

  //fetching the course by InstituteId
  getCourseByInstitutionId(id: string): Observable<any> {
    return this.http.get<any>(this.courseUrl + '/institutionId/' + id);
  }
  //fetching the course by dept id and profile id
  getCourseByDepartmentIdAndProfileId(department_id: number, profileId: number): Observable<any> {
    return this.http.get<any>(this.courseUrl + '/department/' + department_id + '/profile/' + profileId);
  }


  assignCourseToDepartment(coursedepartment: CourseDepartment): Observable<any> {
    return this.http.post<any>(`${this.courseDepartmentUrl}/department`, coursedepartment);
  }

  getCoursesDepartmentId(): Observable<any> {

    return this.http.get<any>(`${this.courseDepartmentUrl}/department?id=all`);
  }





  //add course syllabus with course id
  addCourseSyllabus(courseSyllabus: Coursesyllabus): Observable<any> {
    return this.http.post<any>(`${this.syllabusUrl}`, courseSyllabus);
  }

  //get assign Course to teacher by profile id 
  getAssignedCourseOfTeacher(teacherId: number): Observable<any> {

    return this.http.get<any>(`${this.assignCourseUrl}/teacherid/` + teacherId);
  }

  //get inactive assigned course to teacher by profile id
  getInactiveAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this.http.get<any>(`${this.assignCourseUrl}/inactive/teacherid/` + teacherId);
  }

  getCourseByStudentId(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/profileId/${studentId}`);
  }

}
