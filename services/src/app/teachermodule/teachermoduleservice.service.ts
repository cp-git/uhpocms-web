import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from './module';

@Injectable({
  providedIn: 'root'
})
export class TeachermoduleserviceService {

  constructor(private _http: HttpClient) { }

  fetchModuleList(): Observable<any> {
    return this._http.get<any>("http://localhost:8090/module/uhpocms/module?name=all");
  }

  addTeacherModule(module: Module): Observable<any> {
    return this._http.post<any>("http://localhost:8090/module/uhpocms/module", module);
  }

  deleteModule(moduleName: string): Observable<any> {
    return this._http.delete<any>("http://localhost:8090/module/uhpocms/module/" + moduleName);
  }

  getModuleList(moduleName: string): Observable<any> {
    return this._http.get<any>("http://localhost:8090/module/uhpocms/module/" + moduleName);
  }

  updateModuleList(moduleName: string, module: Module): Observable<any> {

    return this._http.put<any>("http://localhost:8090/module/uhpocms/module/" + moduleName, module);
  }

  getModule(moduleName: string): Observable<Module> {
    return this._http.get<Module>("http://localhost:8090/module/uhpocms/module/" + moduleName);
  }
}
