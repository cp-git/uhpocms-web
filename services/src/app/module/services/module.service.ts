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

  ////////////////////////////////////////// SERVICE  GET ALL MODULES  ////////////////////////////////////  
  getAllModules(): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}?name=all`);
  }

  ///////////////////////////////// SERVICE- GET INACTIVE MODULE LIST  ////////////////////////////////// 
  getInactivemoduleList(): Observable<any> {
    return this._http.get<any>(`${this.moduleUrl}/inactive?inactivemodules=all`);
  }



  /////////////////////////////// SERVICE - ACTIVATE THE MODULE /////////////////////////////////////// 
  activateModuleById(moduleId: number): Observable<any> {
    return this._http.patch<any>(`${this.moduleUrl}/activate/` + moduleId, {});
  }

  // ////////////////////////////////////// CREATE A NEW MODULE ////////////////////////////////////
  addTeacherModule(module: Module): Observable<any> {
    return this._http.post<any>(`${this.moduleUrl}`, module);
  }

  ///////////////////////////////////// DELETE THE MODULE BY MODULE NAME  //////////////////////////////
  deleteModule(moduleName: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleUrl}/` + moduleName);
  }

  /////////////////////////////////////  DELETE THE MODULE NAME ///////////////////////////////////////
  deleteModuleById(moduleId: number): Observable<any> {
    return this._http.delete<any>(`${this.moduleUrl}/moduleId/` + moduleId);
  }




  // update module by module name Used in category
  updateModule(moduleName: string, module: Module): Observable<any> {
    return this._http.put<any>(`${this.moduleUrl}/` + moduleName, module);
  }

  // update module by module id  
  updateModuleById(moduleId: number, module: Module): Observable<any> {
    return this._http.put<any>(`${this.moduleUrl}/moduleId/` + moduleId, module);
  }



  //Course
  getModuleByCourseId(moduleId: number): Observable<Module[]> {
    return this._http.get<Module[]>(`${this.moduleUrl}/courseId/${moduleId}`);
  }

  //Used
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
