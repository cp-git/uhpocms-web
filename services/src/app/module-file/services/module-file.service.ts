import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModuleFile } from 'app/class/module-file';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModuleFileService {

  private readonly moduleFileUrl: string;
  constructor(private _http: HttpClient) {
    this.moduleFileUrl = environment.moduleFileUrl;
  }

  // // for add module File 
  // addModuleFile(formData: FormData): Observable<any> {
  //   return this._http.post<any>("http://localhost:8091/uhpocms/modulefile", formData);
  // }



  // for add module File 
  addModuleFile(formData: FormData): Observable<any> {
    return this._http.post<any>(`${this.moduleFileUrl}/modulefile`, formData);
  }

  // get all module file
  fetchModuleFileList(): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/modulefile?file=all`);
  }

  // get all inactive module file
  getInactivemoduleFileList(): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/inactive?inactivemodulesfile=all`);
  }

  //activate a modulefile by id
  activatemoduleFileById(moduleFileId: number): Observable<any> {
    return this._http.patch<any>(`${this.moduleFileUrl}/modulefile/activate/` + moduleFileId, {});
  }

  // delete module file by file name
  deleteModuleFile(moduleFile: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleFileUrl}/` + moduleFile);
  }

  getModuleFileList(moduleFile: string): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/` + moduleFile);
  }

  // update module file by file name
  updateModuleFileList(moduleFile: string, modulefile: ModuleFile): Observable<any> {
    alert(`${this.moduleFileUrl}/` + moduleFile);
    return this._http.put<any>(`${this.moduleFileUrl}/modulefile/` + moduleFile, modulefile);
  }

  // update module File by id
  updateModuleFileById(moduleFileId: number, formData: FormData): Observable<any> {
    return this._http.put<any>(`${this.moduleFileUrl}/modulefileById/` + moduleFileId, formData);
  }

  // delete module File by id
  deleteModuleFileById(moduleFileId: number): Observable<any> {
    return this._http.delete<any>(`${this.moduleFileUrl}/modulefileById/` + moduleFileId);
  }

  // get module file by file name
  getModuleFile(moduleFile: string): Observable<ModuleFile> {
    return this._http.get<ModuleFile>(`${this.moduleFileUrl}/modulefile/` + moduleFile);
  }

  getModuleFilesByModuleId(moduleId: number): Observable<ModuleFile[]> {
    return this._http.get<ModuleFile[]>(`${this.moduleFileUrl}/modulefile/moduleId/${moduleId}`);
  }


  getModuleFilesByStudentId(studentId: number): Observable<ModuleFile[]> {
    return this._http.get<ModuleFile[]>(`${this.moduleFileUrl}/modulefile/student?id=${studentId}`);
  }

  getFile(fileId: number): Observable<ArrayBuffer> {
    return this._http.get(`${this.moduleFileUrl}/files/${fileId}`, {
      responseType: 'arraybuffer'
    });
  }
}

