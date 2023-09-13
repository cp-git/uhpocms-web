import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Modulefileprogress } from './class/modulefileprogress';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ModulefileprogressService {


  moduleFileProgressUrl: string;

  constructor(private http: HttpClient) {
    this.moduleFileProgressUrl = `${environment.moduleFileProgressUrl}`;
  }
  //add data to module filee progress table --Used
  addFileProgressStatus(fileProgress: Modulefileprogress): Observable<Modulefileprogress> {
    console.log(fileProgress)
    return this.http.post<Modulefileprogress>(`${this.moduleFileProgressUrl}/modulefileprog`, fileProgress);
  }

  //get all module filee progress table :Used
  getAllFileProgressStatus() {
    return this.http.get<Modulefileprogress[]>(`${this.moduleFileProgressUrl}/modulefileprog?id=all`);
  }


  //update question by question figure --Used
  updatedModuleFileProgress(fileProgress: Modulefileprogress): Observable<Modulefileprogress> {
    console.log(fileProgress.fileId)
    console.log(fileProgress.progress)
    return this.http.put<Modulefileprogress>(`${this.moduleFileProgressUrl}/modulefileprog/${fileProgress.id}`, fileProgress);
  }

  //add data to module filee progress table --Used
  getAllFileProgressByModIdStudIdProg(modId: number, studId: number) {
    return this.http.get<Modulefileprogress[]>(`${this.moduleFileProgressUrl}/modulefileprog/${modId}/${studId}`);
  }


  //add data to module filee progress table  --Used
  getAllFileProgressByModIdStudId(modId: number, studId: number) {
    return this.http.get<Modulefileprogress[]>(`${this.moduleFileProgressUrl}/modulefileprog/mod_studId/${modId}/${studId}`);
  }


  //Used
  updateModuleFileProgressByFileIdAndStudentId(moduleFileId: number, studentId: number, moduleFileProgress: Modulefileprogress): Observable<Modulefileprogress> {
    return this.http.put<Modulefileprogress>(`${this.moduleFileProgressUrl}/modulefileprog/file_studid/${moduleFileId}/${studentId}`, moduleFileProgress);
  }


  //Used
  getFileProgressByFileIdAndStudentId(fileId: number, studentId: number) {
    return this.http.get<Modulefileprogress>(`${this.moduleFileProgressUrl}/modulefileprog/file_studid/${fileId}/${studentId}`);
  }

}