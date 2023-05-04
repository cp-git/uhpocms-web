import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Modulefileprogress } from '../class/modulefileprogress';
import { Observable } from 'rxjs/internal/Observable';
import { Moduleprogress } from '../class/moduleprogress';
import { CourseProgress } from '../class/courseprogress';

@Injectable({
  providedIn: 'root'
})
export class ModulefileprogressService {
  moduleFileProgressUrl: string;
  moduleProgressUrl: string;
  courseProgressUrl: string;

  //constructor
  constructor(private http: HttpClient) {
    this.moduleFileProgressUrl = `${environment.moduleFileProgressUrl}`;
    this.moduleProgressUrl = `${environment.moduleProgressUrl}`;
    this.courseProgressUrl = `${environment.courseProgressUrl}`;
  }

  //add data to module filee progress table
  addFileProgressStatus(fileProgress: Modulefileprogress): Observable<Modulefileprogress> {
    console.log(fileProgress)
    return this.http.post<Modulefileprogress>(`${this.moduleFileProgressUrl}/modulefileprog`, fileProgress);
  }

  //get all module filee progress table
  getAllFileProgressStatus() {
    return this.http.get<Modulefileprogress[]>(`${this.moduleFileProgressUrl}/modulefileprog?id=all`);
  }


  //update question by question figure
  updatedModuleFileProgress(fileProgress: Modulefileprogress): Observable<Modulefileprogress> {
    console.log(fileProgress.fileId)
    console.log(fileProgress.progress)
    return this.http.put<Modulefileprogress>(`${this.moduleFileProgressUrl}/modulefileprog/${fileProgress.id}`, fileProgress);
  }

  //add data to moduleprogress table
  addModuleProgressStatus(moduleProgress: Moduleprogress): Observable<Moduleprogress> {
    console.log(moduleProgress)
    return this.http.post<Moduleprogress>(`${this.moduleProgressUrl}/moduleprog`, moduleProgress);
  }

  //get data to module filee progress table
  getModuleProgressByModIdStudId(modId: number, studId: number) {
    return this.http.get<Moduleprogress>(`${this.moduleProgressUrl}/moduleprog/${modId}/${studId}`);
  }

  //add data to module filee progress table
  getAllFileProgressByModIdStudIdProg(modId: number, studId: number) {
    return this.http.get<Modulefileprogress[]>(`${this.moduleFileProgressUrl}/modulefileprog/${modId}/${studId}`);
  }


  //add data to module filee progress table
  getAllFileProgressByModIdStudId(modId: number, studId: number) {
    return this.http.get<Modulefileprogress[]>(`${this.moduleFileProgressUrl}/modulefileprog/mod_studId/${modId}/${studId}`);
  }

  //add data to moduleprogress table
  addCourseProgressStatus(courseProgress: CourseProgress): Observable<CourseProgress> {
    console.log(courseProgress)
    return this.http.post<CourseProgress>(`${this.courseProgressUrl}/courseprog`, courseProgress);
  }

  getModuleProgByCourseId(courseId: number) {
    console.log(courseId)
    return this.http.get<Moduleprogress[]>(`${this.moduleProgressUrl}/moduleprog/courseId/${courseId}`);
  }

  getCourseProgByCourseIdStudId(courseId: number, studId: number) {
    return this.http.get<CourseProgress>(`${this.courseProgressUrl}/courseprog/${courseId}/${studId}`);
  }


  //update module Progress
  updateModuleProgress(moduleProgress: Moduleprogress): Observable<Moduleprogress> 
  {
      return this.http.put<Moduleprogress>(`${this.moduleProgressUrl}/moduleprog/${moduleProgress.id}`,moduleProgress);
  }


  updateCourseProgress(courseProgress: CourseProgress): Observable<CourseProgress> 
  {console.log(courseProgress)
      return this.http.put<CourseProgress>(`${this.courseProgressUrl}/courseprog/${courseProgress.id}`,courseProgress);
  }
}