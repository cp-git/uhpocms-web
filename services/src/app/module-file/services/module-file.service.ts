import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { ModuleFile } from '../class/module-file';

@Injectable({
  providedIn: 'root'
})
export class ModuleFileService {

  private readonly moduleFileUrl: string;
  constructor(private _http: HttpClient) {
    this.moduleFileUrl = environment.moduleFileUrl;
  }




  /////////////////////////////////////////////// SERVICE - ADD MODULE FILE /////////////////////////////////////////////
  addModuleFile(formData: FormData): Observable<any> {
    return this._http.post<any>(`http://localhost:8090/modulefile/uhpocms/modulefile`, formData);
  }

  /////////////////////////////////////////// SERVICE - GET ALL MODULE FILE ///////////////////////////////////////////
  fetchModuleFileList(): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/modulefile?file=all`);
  }

  ////////////////////////////////// SERVICE - FETCH ALL MODULE FILE USING ACTIVE MODULE ////////////////

  fetchModuleFileListActiveModule(): Observable<any> {
    return this._http.get<any>(`http://localhost:8090/modulefile/uhpocms/modulefileActiveByModule?file=all`);
  }

  /////////////////////////////////////// SERVICE - GET ALL INACTIVE MODULE FILE //////////////////////////////
  getInactivemoduleFileList(): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/inactive?inactivemodulesfile=all`);
  }

  //////////////////////////////// SERVICE - ACTIVATE MODULE FILE BY MODULE FILE ID /////////////////////////////////////
  activatemoduleFileById(moduleFileId: number): Observable<any> {
    return this._http.patch<any>(`${this.moduleFileUrl}/modulefile/activate/` + moduleFileId, {});
  }

  ///////////////////////////////// SERVICE - DELETE MODULE FILE BY FILE NAME /////////////////////////////////////////
  deleteModuleFile(moduleFile: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleFileUrl}/` + moduleFile);
  }


  /////////////////////////////// SERVICE - GET MODULE FILE BY MODULE FILE ///////////////////////////////////////////
  getModuleFileList(moduleFile: string): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/` + moduleFile);
  }


  //////////////////////////// SERVICE - UPDATE MODULE FILE BY MODULE FILE ///////////////////////////////////////////
  updateModuleFileList(moduleFile: string, modulefile: ModuleFile): Observable<any> {
    alert(`${this.moduleFileUrl}/` + moduleFile);
    return this._http.put<any>(`${this.moduleFileUrl}/modulefile/` + moduleFile, modulefile);
  }

  ////////////////////////// SERVICE - UPDATE MODULE FILE BY MODULE ID //////////////////////////////////////////////
  updateModuleFileById(moduleFileId: number, formData: FormData): Observable<any> {
    return this._http.put<any>(`http://localhost:8090/modulefile/uhpocms/modulefileById/` + moduleFileId, formData);
  }

  ////////////////////////////////// SERVICE - UPDATE  MODULE FILE BY MODULE FILE ID ///////////////////////////////
  updateModuleFileJsonById(moduleFileId: number, moduleFile: ModuleFile): Observable<any> {
    return this._http.put<any>(`${this.moduleFileUrl}/moduleupdatejson/` + moduleFileId, moduleFile);
  }


  //////////////////////////////// SERVICE - DELETE MODULE FILE BY ID ////////////////////////////////////
  deleteModuleFileById(moduleFileId: number): Observable<any> {
    return this._http.delete<any>(`${this.moduleFileUrl}/modulefileById/` + moduleFileId);
  }



  ///////////////////////////////// SERVICE - GET MODULE FILE BY MODULE ID //////////////////////////////
  getModuleFilesByModuleId(moduleId: number): Observable<ModuleFile[]> {
    return this._http.get<ModuleFile[]>(`${this.moduleFileUrl}/modulefile/moduleId/${moduleId}`);
  }


  ///////////////////////////// SERVICE - GET MODULE FILE OF ENROLLED COURSES OF MODULES BY PROFILE ID  /////////////////////////////
  getModuleFilesOfEnrolledCoursesOfModulesByProfileId(studentId: number): Observable<ModuleFile[]> {
    return this._http.get<ModuleFile[]>(`${this.moduleFileUrl}/modulefile/student?id=${studentId}`);
  }

  ////////////////////////////////// SERVICE -GET MODULES OF ASSIGNED COURSE MODULE BY PROFILE ID  /////////////////////////////////
  getModuleFilesOfAssignedCoursesOfModulesByProfileId(teacherId: number): Observable<ModuleFile[]> {
    return this._http.get<ModuleFile[]>(`${this.moduleFileUrl}/modulefile/teacher?id=${teacherId}`);
  }

  /////////////////////////////////// SERVICE - GET FILE BY MODULE FILE ID ////////////////////////////////////////////////////
  getFile(fileId: number): Observable<ArrayBuffer> {
    return this._http.get(`${this.moduleFileUrl}/files/${fileId}`, {
      responseType: 'arraybuffer'
    });
  }
}

