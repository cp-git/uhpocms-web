import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleFile } from 'app/class/module-file';
import { Course } from 'app/course/course';
import { Module } from 'app/teachermodule/module';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private moduleFileUrl: string = `${environment.moduleFileUrl}`;
  private courseUrl: string = `${environment.courseUrl}`;
  private moduleUrl: string = `${environment.moduleUrl}`;
  constructor(private http: HttpClient) { }

  getModuleFilesByStudentId(studentId: number): Observable<ModuleFile[]> {
    return this.http.get<ModuleFile[]>(`${this.moduleFileUrl}/modulefile/student?id=${studentId}`);
  }
  getCourseByStudentId(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/course/profileId/${studentId}`);
  }

  getModuleByCourseId(moduleId: number): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.moduleUrl}/module/courseId/${moduleId}`);
  }
}
