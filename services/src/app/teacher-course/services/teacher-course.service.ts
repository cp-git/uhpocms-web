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
import { Department } from 'app/department/class/department';

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

  ////////////////////////////// SERVICE - GET ALL COURSES //////////////////////////////////////////
  getAllCourses(): Observable<any> {
    return this.http.get<any>(this.courseUrl + "?name=all");
  }


  //////////////////////////////// SERVICE - INSERTION OF COURSE /////////////////////////////////////
  addCourse(course: Course): Observable<any> {
    return this.http.post<any>(this.courseUrl, course);
  }

  //////////////////////////////////// SERVICE - DELETE COURSE BY ID /////////////////////////////////////////
  deleteCourseByCourseId(courseId: number): Observable<any> {
    return this.http.delete<any>(this.courseUrl + '/courseId/' + courseId);
  }

  /////////////////////////// SERVICE - UPDATE COURSE BY COURSE ID ///////////////////////////////////////////
  updateCourseById(courseId: number, course: Course): Observable<any> {
    return this.http.put<any>(this.courseUrl + '/courseID/' + courseId, course);
  }


  ///////////////////////////// SERVICE - GET COURSE BY COURSE ID ///////////////////////////////////////
  getCourseByCourseId(courseId: number): Observable<any> {
    const cachedData = this.cache.getDataFromCache(this.courseUrl + '/courseId/' + courseId);
    if (cachedData) {
      return of(cachedData);
    }


    return this.http.get<Course>(this.courseUrl + '/courseId/' + courseId).pipe(
      //   tap(

      //     data => this.cache.setDataInCache(this.courseUrl + '/courseId/' + courseId, data))
      // );


      tap(data => {
        // Update cache with new data
        this.cache.removeFromCache(this.courseUrl + '/courseId/' + courseId);
        this.cache.setDataInCache(this.courseUrl + '/courseId/' + courseId, data);
      })
    );
  }


  ////////////////////////// SERVICE - GET ALL INACTIVE COURSES ///////////////////////////////////////
  //get all inactive courses --Used
  getAllDeactivateCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}?name=inactive`);
  }

  /////////////////////////// SERVICE - ACTIVATE COURSE BY COURSE ID//////////////////////////////
  activateCourseById(courseId: number): Observable<any> {
    return this.http.patch<any>(`${this.courseUrl}/activate/` + courseId, {});
  }


  /////////////////////////// SERVICE - GET COURSES BY DEPARTMENT ID ///////////////////////////////

  getCourseByDepartmentId(deptid: number) {
    const cachedData = this.cache.getDataFromCache(`${this.courseUrl}/deptId/` + deptid)
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<any>(`${this.courseUrl}/deptId/` + deptid).pipe(
      //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
      // );

      tap(data => {
        // Update cache with new data
        this.cache.removeFromCache(`${this.courseUrl}/deptId/` + deptid)
        this.cache.setDataInCache((`${this.courseUrl}/deptId/` + deptid), data);
      })
    );

  }

  ///////////////////// FECTHING COURSE BY INSTITUTION ID USED IN VIEW COURSES COMPONENT TS FILE //////////////////////

  //fetching the course by InstituteId --Used  in  src/app/institute-details/components/view-courses/view-courses.component.ts
  getCourseByInstitutionId(id: string): Observable<any> {
    const cachedData = this.cache.getDataFromCache(this.courseUrl + '/institutionId/' + id);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<any>(this.courseUrl + '/institutionId/' + id).pipe(
      //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
      // );

      tap(data => {
        // Update cache with new data
        this.cache.removeFromCache(this.courseUrl + '/institutionId/' + id);
        this.cache.setDataInCache((this.courseUrl + '/institutionId/' + id), data);
      })
    );

  }

  /////////////////////////////// FETCHING COURSE BY DEPARTMENT ID AND PROFILE ID ////////////////////////////////////
  //fetching the course by dept id and profile id
  getCourseByDepartmentIdAndProfileId(department_id: number, profileId: number): Observable<any> {
    return this.http.get<any>(this.courseUrl + '/department/' + department_id + '/profile/' + profileId);
  }



  ////////////////////////////// ASSIGNING COURSE TO DEPARTMENT //////////////////////////////////////////////////////
  assignCourseToDepartment(coursedepartment: CourseDepartment): Observable<any> {
    return this.http.post<any>(`${this.courseDepartmentUrl}/department`, coursedepartment);
  }



  ////////////////////////////// GET COURSES BY DEPARTMENT ID /////////////////////////////////////////////////////
  getCoursesDepartmentId(): Observable<any> {

    return this.http.get<any>(`${this.courseDepartmentUrl}/department?id=all`);
  }





  /////////////////////////////////////  ADDING COURSE SYALLBUS  //////////////////////////////////////////////

  addCourseSyllabus(courseSyllabus: Coursesyllabus): Observable<any> {
    return this.http.post<any>(`${this.syllabusUrl}`, courseSyllabus);
  }



  ////////////////////////// GET ASSIGN COURSE TO TEACHER BY PROFILE ID USED IN MODULE COMPONENT ///////////////////////////////////////

  getAssignedCourseOfTeacher(teacherId: number): Observable<any> {

    return this.http.get<any>(`${this.assignCourseUrl}/teacherid/` + teacherId);
  }


  /////////////////////////// GET INACTIVE ASSIGNED COURSE TO TEACHER BY PROFILE ID ////////////////////////
  getInactiveAssignedCourseToTeacher(teacherId: number): Observable<any> {
    return this.http.get<any>(`${this.assignCourseUrl}/inactive/teacherid/` + teacherId);
  }


  //////////////////////////////////   GET COURSES BY STUDENT ID   /////////////////////////////////////////////////
  getCourseByStudentId(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/profileId/${studentId}`);
  }


  /////////////////////////// GET INACTIVE COURSES BY INSTITUTE ID //////////////////////////////////////////////
  getInactiveCoursesByInstitutionId(institutionId: number): Observable<any> {

    return this.http.get<any>(`${this.courseUrl}/inactive/institutionId/${institutionId}`);
  }


  //////////////////////////////  GET ALL COURSES BY DEPARTMENT ID   ////////////////////////////////////////////

  getAllCoursesByDepartmentId(departmentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/deptId/${departmentId}`)

  }
}
