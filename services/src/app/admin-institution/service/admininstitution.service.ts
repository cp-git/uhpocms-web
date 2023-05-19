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

  //service to get all institutions
  fetchAdminInstitutionList(): Observable<any> {
    return this._http.get<any>(`${this.institutionUrl}?name=all`);
  }

  //service to add institution
  // addInstitution(formData: FormData): Observable<any> {



  //   return this._http.post<any>("http://localhost:8091/uhpocms/institution", formData);
  // }

  addInstitution(formData: FormData): Observable<any> {



    return this._http.post<any>("http://localhost:8090/admininstitution/uhpocms/institution", formData);
  }

  //service to delete institution
  deleteInstitution(admininstitutionName: string): Observable<any> {
    return this._http.delete<any>(`${this.institutionUrl}/` + admininstitutionName);
  }

  //service to get institution by institution name
  getAdminInstitutionList(admininstitutionName: string): Observable<any> {
    return this._http.get<any>(`${this.institutionUrl}/` + admininstitutionName);
  }

  //service to update institution
  updateInstitutionList(admininstitutionName: string, admininstitution: AdminInstitution): Observable<any> {
    return this._http.put<any>(
      `${this.institutionUrl}/admininstitution/` + admininstitutionName,
      admininstitution
    );
  }

  getInstitution(admininstitutionName: string): Observable<AdminInstitution> {
    return this._http.get<AdminInstitution>(`${this.institutionUrl}/admininstitution/` + admininstitutionName);
  }

  //service to get inactive institutions
  getDeactivatedInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.institutionUrl}?name=inactive`);
  }

  //service to activate institution 
  activateInstitutionById(institutionId: number): Observable<any> {
    return this._http.patch<any>(`${this.institutionUrl}/activate/` + institutionId, {});
  }

  //service to get institution by provided profile id
  getInstitutionByProfileId(id: number): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.institutionUrl}/profile/` + id);
  }
}