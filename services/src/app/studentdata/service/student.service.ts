import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleFile } from 'app/class/module-file';
import { Course } from 'app/course/course';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private moduleUrl: string = `${environment.moduleFileUrl}`;

  constructor(private http: HttpClient) { }

  getStudentCoursesByStudentId(studentId: number): Observable<ModuleFile[]> {

    return this.http.get<ModuleFile[]>(`${this.moduleUrl}/modulefile/student?id=${studentId}`);

  }
}
