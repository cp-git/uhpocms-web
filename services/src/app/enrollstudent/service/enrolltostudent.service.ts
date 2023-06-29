import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map, Observable, of, tap } from 'rxjs';
import { Enrolltostudent } from '../class/enrolltostudent';
import { DataServiceCache } from 'app/cache/service/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class EnrolltostudentService {

  enrollmentUrl: string;

  //constructor
  constructor(private _http: HttpClient, private cache: DataServiceCache) {
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

   getProfileByInstIdCourId(instId:any,courseId:any){
    const cachedData = this.cache.getDataFromCache(`${this.enrollmentUrl}instid_courid/` + instId +"/"+courseId);
    if (cachedData) {
      return of(cachedData);
    }

    return this._http.get<any>(`${this.enrollmentUrl}instid_courid/` + instId +"/"+courseId).pipe(
    //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
    // );

    tap(data => {
      // Update cache with new data
      this.cache.removeFromCache(`${this.enrollmentUrl}instid_courid/` + instId +"/"+courseId);
      this.cache.setDataInCache((`${this.enrollmentUrl}instid_courid/` + instId +"/"+courseId), data);
    })
  );

  
  }



}
