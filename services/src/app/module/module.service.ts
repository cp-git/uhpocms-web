import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private _baseUrl: string;

  constructor(private _http: HttpClient) {
    this._baseUrl = `${environment.moduleUrl}/module`;
  }

  _getAllModules(): Observable<any> {
    return this._http.get<any>(this._baseUrl + '?name=all');
  }
}
