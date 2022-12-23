import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InstituteAdmin } from './institute-admin';

@Injectable({
  providedIn: 'root'
})
export class InstituteAdminServiceService {

  private _baseUrl: string;
  constructor(private _http: HttpClient) {
    this._baseUrl = "http://localhost:8090/uhpocms/profile";
  }

  _getAllInstituteAdminList(): Observable<any> {
    return this._http.get<any>(this._baseUrl+ "?firstName=all");
  }

  _getInstituteAdminList(firstName: string): Observable<any> {
    return this._http.get<any>(this._baseUrl + "/" + firstName);
  }

  _addInstituteAdminList(instituteAdmin:  InstituteAdmin): Observable<any>{
    return this._http.post<any>(this._baseUrl + "/" , instituteAdmin);
  }

  _updateInstituteAdminList(firstName : string, instituteAdmin:  InstituteAdmin): Observable<any>{
    return this._http.put<any>(this._baseUrl + "/" +firstName , instituteAdmin);
  }

  _deleteInstituteAdminList(firstName : string):Observable<any>
  {
    return this._http.delete<any>(this._baseUrl +"/" +firstName);
  }
}
