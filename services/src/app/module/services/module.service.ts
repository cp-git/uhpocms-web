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

  // get all modules
  getAllModules(): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}?name=all`);
  }

  // get all inactive modules
  getInactivemoduleList(): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/inactive?inactivemodules=all`);
  }

  // activate module by module name
  activateModule(moduleName: string): Observable<any> {
    return this._http.patch<any>(`${this.moduleUrl}/` + moduleName, {});
  }

  // Add teacher module
  addTeacherModule(module: Module): Observable<any> {
    return this._http.post<any>(`${this.moduleUrl}`, module);
  }

  // delete module by module name
  deleteModule(moduleName: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleUrl}/` + moduleName);
  }

  getModuleList(moduleName: string): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/` + moduleName);
  }


  // update module by module name
  updateModule(moduleName: string, module: Module): Observable<any> {
    return this._http.put<any>(`${this.moduleUrl}/` + moduleName, module);
  }

  // get module by module name
  getModule(moduleName: string): Observable<Module> {
    return this._http.get<Module>(`${this.moduleUrl}/module/` + moduleName);
  }

  getModuleByCourseId(moduleId: number): Observable<Module[]> {
    return this._http.get<Module[]>(`${this.moduleUrl}/module/courseId/${moduleId}`);
  }
}
