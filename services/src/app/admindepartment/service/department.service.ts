import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { Department } from '../department';
import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
// import { InsertDepartmentComponent } from '../insert-department/insert-department.component';

import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly departmentUrl: string = environment.departmentUrl;
  private readonly adminInstitutionUrl: string = environment.adminInstitutionUrl;

  constructor(private _http: HttpClient) {
  }

  fetchAllDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=all`);
  }

  fetchAllInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.adminInstitutionUrl}/institution?name=all`);
  }

  insertDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>(`${this.departmentUrl}/department`, department);
  }

  deleteDepartment(name: string): Observable<any> {
    return this._http.delete<Department>(`${this.departmentUrl}/department/` + name);
  }


  updateDepartment(name: string, department: Department) {
    return this._http.put<Department>(`${this.departmentUrl}/department/` + name, department);
  }

  getDepartmentByName(name: string) {
    return this._http.get<Department>(`${this.departmentUrl}/getdept/` + name);
  }

}
