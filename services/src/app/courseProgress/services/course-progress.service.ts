import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { CourseProgress } from '../class/courseprogress';
import { HttpClient } from '@angular/common/http';
import { DataServiceCache } from 'app/cache/service/data-service.service';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class CourseProgressService {


  courseProgressUrl: string;
  constructor(private http: HttpClient, private cache: DataServiceCache) { 
    this.courseProgressUrl = `${environment.courseProgressUrl}`;
  }


  //add data to moduleprogress table
  addCourseProgressStatus(courseProgress: CourseProgress): Observable<CourseProgress> {
    console.log(courseProgress)
    return this.http.post<CourseProgress>(`${this.courseProgressUrl}/courseprog`, courseProgress);
  }


  getCourseProgByCourseIdStudId(courseId: number, studId: number) {
    return this.http.get<CourseProgress>(`${this.courseProgressUrl}/courseprog/${courseId}/${studId}`);
  }


  updateCourseProgress(courseProgress: CourseProgress): Observable<CourseProgress> 
  {console.log(courseProgress)
      return this.http.put<CourseProgress>(`${this.courseProgressUrl}/courseprog/${courseProgress.id}`,courseProgress);
  }


  getAllCourseProgress()
  {
    const cachedData = this.cache.getDataFromCache(`${this.courseProgressUrl}/courseprog?id=all`);
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<CourseProgress[]>(`${this.courseProgressUrl}/courseprog?id=all`).pipe(
    //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
    // );

    tap(data => {
      // Update cache with new data
      this.cache.removeFromCache(`${this.courseProgressUrl}/courseprog?id=all`);
      this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data);
    })
  );
  }

  deleteCourseProgressByCourseIdAndStudentId(courseId: number, profileId: number): Observable<any> {
    const url = `${this.courseProgressUrl}/courseprog/courseid/${courseId}/studentid/${profileId}`;
    return this.http.delete<any>(url);
  }
  
}
