import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { CourseProgress } from '../class/courseprogress';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseProgressService {


  courseProgressUrl: string;
  constructor(private http: HttpClient) { 
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
    return this.http.get<CourseProgress[]>(`${this.courseProgressUrl}/courseprog?id=all`)
  }

  
}
