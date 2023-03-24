import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../class/module';
import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private readonly moduleUrl: string;
  constructor(private _http: HttpClient) {

    this.moduleUrl = environment.moduleUrl + '/module';

  }

  getAllModules(): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}?name=all`);
  }

  getInactivemoduleList(): Observable<any> {
    //  alert(`${this.moduleUrl}/inactive?inactivemodules=all`);

    return this._http.get<any>(`${this.moduleUrl}/inactive?inactivemodules=all`);
  }

  activateModule(moduleName: string): Observable<any> {
    return this._http.patch<any>(`${this.moduleUrl}/` + moduleName, {});
  }


  addTeacherModule(module: Module): Observable<any> {
    //   alert(`${this.moduleUrl}`);
    return this._http.post<any>(`${this.moduleUrl}`, module);
  }

  deleteModule(moduleName: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleUrl}/` + moduleName);
  }

  getModuleList(moduleName: string): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/` + moduleName);
  }

  updateModule(moduleName: string, module: Module): Observable<any> {
    //   alert(`${this.moduleUrl}/` + moduleName);
    return this._http.put<any>(`${this.moduleUrl}/` + moduleName, module);
  }

  getModule(moduleName: string): Observable<Module> {
    return this._http.get<Module>(`${this.moduleUrl}/module/` + moduleName);
  }
}
