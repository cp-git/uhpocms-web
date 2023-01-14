import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = "http://localhost:8090/module/uhpocms/module";
   }

   _getAllModules():Observable<any>
   {
     return this._http.get<any>(this._baseUrl+ "?name=all");
   }
 
}
