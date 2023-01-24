import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from './module';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class TeachermoduleserviceService {

  private readonly moduleUrl: string = environment.moduleUrl + "/module";
  constructor(private _http: HttpClient) { }

  fetchModuleList(): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/?name=all`);
  }

  addTeacherModule(module: Module): Observable<any> {
    return this._http.post<any>(`${this.moduleUrl}`, module);
  }

  deleteModule(moduleName: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleUrl}/` + moduleName);
  }

  getModuleList(moduleName: string): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/` + moduleName);
  }

  updateModuleList(moduleName: string, module: Module): Observable<any> {

    return this._http.put<any>(`${this.moduleUrl}/module/` + moduleName, module);
  }

  getModule(moduleName: string): Observable<Module> {
    return this._http.get<Module>(`${this.moduleUrl}/module/` + moduleName);
  }
}
