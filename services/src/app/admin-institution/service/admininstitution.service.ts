import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { AdminInstitution } from '../class/admininstitution';


@Injectable({
  providedIn: 'root'
})
export class AdmininstitutionService {
  private readonly institutionUrl: string;

  constructor(private _http: HttpClient) {

    this.institutionUrl = `${environment.adminInstitutionUrl}/institution`;

  }


  /////////////////  SERVICE - FETCHING THE ALL INSTITUTION ////////////////////////////////
  fetchAdminInstitutionList(): Observable<any> {
    return this._http.get<any>(`${this.institutionUrl}?name=all`);
  }



  ////////////////////  SERVICE - INSERTING THE INSTITUTE ALONG WITH IMAGE ////////////////////
  addInstitution(formData: FormData): Observable<any> {
    return this._http.post<any>(`${this.institutionUrl}`, formData);
  }



  ////////////////////// SERVICE - GET ALL INACTIVE INSTITUTION ////////////////////////////////
  getDeactivatedInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.institutionUrl}?name=inactive`);
  }

  //////////////////////  SERVICE - ACTIVATE INSTITUTE BY ID ////////////////////////////////////
  activateInstitutionById(institutionId: number): Observable<any> {
    return this._http.patch<any>(`${this.institutionUrl}/activate/` + institutionId, {});
  }


  /////////////////////  SERVICE - INSTITUTION BY PROFILE ID ////////////////////////
  getInstitutionByProfileId(id: number): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.institutionUrl}/profile/` + id);
  }




  /////////////////////// SERVICE - DELETE THE ADMIN INSTITUTION BY ID//////////////////////
  deleteInstitutionById(adminInstitutionId: number): Observable<any> {
    return this._http.delete<any>(`${this.institutionUrl}/institutionId/` + adminInstitutionId);
  }



}