import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Moduleprogress } from '../class/moduleprogress';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ModuleProgressService {


  moduleProgressUrl: string;


  constructor(private http: HttpClient) {
    this.moduleProgressUrl = `${environment.moduleProgressUrl}`;
  }

  //comment

  //add data to moduleprogress table --Used
  addModuleProgressStatus(moduleProgress: Moduleprogress): Observable<Moduleprogress> {
    console.log(moduleProgress)
    return this.http.post<Moduleprogress>(`${this.moduleProgressUrl}/moduleprog`, moduleProgress);
  }

  //get data to module filee progress table --Used
  getModuleProgressByModIdStudId(modId: number, studId: number) {
    return this.http.get<Moduleprogress>(`${this.moduleProgressUrl}/moduleprog/${modId}/${studId}`);
  }


  //Not Used
  getModuleProgByCourseId(courseId: number) {
    console.log(courseId)
    return this.http.get<Moduleprogress[]>(`${this.moduleProgressUrl}/moduleprog/courseId/${courseId}`);
  }

  //update module Progress --Used
  updateModuleProgress(moduleProgress: Moduleprogress): Observable<Moduleprogress> {
    return this.http.put<Moduleprogress>(`${this.moduleProgressUrl}/moduleprog/${moduleProgress.id}`, moduleProgress);
  }


  //Used
  getModuleProgressesByCourseIdAndStudentId(courseId: number, studentId: number) {
    console.log(courseId + " " + studentId);
    return this.http.get<Moduleprogress[]>(`${this.moduleProgressUrl}/moduleprog/id?courseid=${courseId}&studentid=${studentId}`);
  }
}