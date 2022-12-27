import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from '../department';
import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
// import { InsertDepartmentComponent } from '../insert-department/insert-department.component';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl: string = "http://localhost:8060/uhpocms";

  constructor(private _http: HttpClient) {
  }

  fetchAllDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.baseUrl}/getdept?name=all`);
  }

  fetchAllInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`http://localhost:8050/uhpocms/institution?name=all`);
  }

  insertDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>(`${this.baseUrl}/department`, department);
  }

  // deleteDepartment(name: string): Observable<any> {
  //   return this._http.delete<Department>(`${this.baseUrl}/department/` + name);
  // }

  // getDepartmentByName(name: string): Observable<Department> {
  //   return this._http.get<Department>(`${this.baseUrl}/getdept/` + name);
  // }

  // updateDepartment(name: string, department: Department) {
  //   return this._http.put<Department>(`${this.baseUrl}/department/` + name, department);
  // }


}
