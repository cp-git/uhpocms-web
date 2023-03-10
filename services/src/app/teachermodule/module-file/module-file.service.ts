import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModuleFile } from 'app/class/module-file';

@Injectable({
  providedIn: 'root'
})
export class ModuleFileService {

  private readonly moduleFileUrl: string;
  constructor(private _http: HttpClient) {



    // this.moduleFileUrl = environment.moduleFileUrl + '/modulefile';

    this.moduleFileUrl = `http://localhost:8090/modulefile/uhpocms/modulefile`;


    // this.moduleFileUrl = environment.moduleFileUrl + '/modulefile';

    this.moduleFileUrl = `http://localhost:8090/modulefile/uhpocms/modulefile`;

  }

  fetchModuleFileList(): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/?name=all`);
  }

  getInactivemoduleFileList(): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/inactive?inactivemodulesfile=all`);
  }

  updateActiveStatus(moduleFile: string, modulefile: ModuleFile): Observable<any> {
    return this._http.patch<any>(`${this.moduleFileUrl}/` + moduleFile, modulefile);
  }


  addModuleFile(modulefile: ModuleFile): Observable<any> {

    return this._http.post<any>(`${this.moduleFileUrl}`, modulefile);
  }

  deleteModuleFile(moduleFile: string): Observable<any> {
    return this._http.delete<any>(`${this.moduleFileUrl}/` + moduleFile);
  }

  getModuleFileList(moduleFile: string): Observable<any> {
    return this._http.get<any>(`${this.moduleFileUrl}/` + moduleFile);
  }

  updateModuleFileList(moduleFile: string, modulefile: ModuleFile): Observable<any> {
    alert(`${this.moduleFileUrl}/` + moduleFile);
    return this._http.put<any>(`${this.moduleFileUrl}/modulefile/` + moduleFile, modulefile);
  }

  getModuleFile(moduleFile: string): Observable<ModuleFile> {
    return this._http.get<ModuleFile>(`${this.moduleFileUrl}/modulefile/` + moduleFile);
  }
}

