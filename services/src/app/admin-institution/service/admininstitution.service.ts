import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { AdminInstitution } from '../admininstitution';

@Injectable({
  providedIn: 'root'
})
export class AdmininstitutionService {

  private readonly institutionUrl: string;
  constructor(private _http: HttpClient) {

    this.institutionUrl = `http://localhost:8090/admininstitution/uhpocms/institution`;
    //this.institutionUrl = `${environment.adminInstitutionUrl}/institution`;

  }

  fetchAdminInstitutionList(): Observable<any> {
    return this._http.get<any>(`${this.institutionUrl}?name=all`);
  }

  addInstitution(admininstitution: AdminInstitution): Observable<any> {

    return this._http.post<any>(`${this.institutionUrl}`, admininstitution);
  }

  deleteInstitution(admininstitutionName: string): Observable<any> {
    return this._http.delete<any>(`${this.institutionUrl}/` + admininstitutionName);
  }

  getAdminInstitutionList(admininstitutionName: string): Observable<any> {
    return this._http.get<any>(`${this.institutionUrl}/` + admininstitutionName);
  }

  updateInstitutionList(admininstitutionName: string, admininstitution: AdminInstitution): Observable<any> {
    return this._http.put<any>(
      `${this.institutionUrl}/admininstitution/` + admininstitutionName,
      admininstitution
    );
  }

  getInstitution(admininstitutionName: string): Observable<AdminInstitution> {
    return this._http.get<AdminInstitution>(`${this.institutionUrl}/admininstitution/` + admininstitutionName);
  }

  getDeactivatedInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.institutionUrl}?name=inactive`);
  }

  activateInstitutionById(institutionId: number): Observable<any> {
    return this._http.patch<any>(`${this.institutionUrl}/activate/` + institutionId, {});
  }
}