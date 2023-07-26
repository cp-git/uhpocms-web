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

  // activate module by module id
  activateModuleById(moduleId: number): Observable<any> {
    return this._http.patch<any>(`${this.moduleUrl}/activate/` + moduleId, {});
  }

  // Add teacher module
  addTeacherModule(module: Module): Observable<any> {
    return this._http.post<any>(`${this.moduleUrl}`, module);
  }

  // delete module by module name
  deleteModule(moduleName: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleUrl}/` + moduleName);
  }

  // delete module by module name
  deleteModuleById(moduleId: number): Observable<any> {
    return this._http.delete<any>(`${this.moduleUrl}/moduleId/` + moduleId);
  }

  getModuleList(moduleName: string): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/` + moduleName);
  }


  // update module by module name
  updateModule(moduleName: string, module: Module): Observable<any> {
    return this._http.put<any>(`${this.moduleUrl}/` + moduleName, module);
  }

  // update module by module id
  updateModuleById(moduleId: number, module: Module): Observable<any> {
    return this._http.put<any>(`${this.moduleUrl}/moduleId/` + moduleId, module);
  }

  // get module by module name
  getModule(moduleName: string): Observable<Module> {
    return this._http.get<Module>(`${this.moduleUrl}/module/` + moduleName);
  }

  getModuleByCourseId(moduleId: number): Observable<Module[]> {
    return this._http.get<Module[]>(`${this.moduleUrl}/courseId/${moduleId}`);
  }

  getModulesByCourseId(courseId: number): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/courseId/${courseId}`);

  }

  getModulesOfAssignedCoursesByProfileId(profileId: number): Observable<Module[]> {
    return this._http.get<Module[]>(`${this.moduleUrl}/assign/profileid/${profileId}`);

  }
  getModulesOfEnrolledCoursesByProfileId(profileId: number): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/enroll/profileid/${profileId}`);

  }
}
