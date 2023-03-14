import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from '../department';
import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
// import { InsertDepartmentComponent } from '../insert-department/insert-department.component';

import { environment } from 'environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly departmentUrl: string;
  private readonly adminInstitutionUrl: string;

  constructor(private _http: HttpClient) {


    // this.departmentUrl = environment.departmentUrl;
    this.adminInstitutionUrl = environment.adminInstitutionUrl;

    this.departmentUrl = `http://localhost:8090/department/uhpocms`;
    // this.adminInstitutionUrl = `http://localhost:8090/department/uhpocms`;

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
  createDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>(`${this.departmentUrl}/dept`, department);
  }

  deleteDepartment(name: string): Observable<any> {
    return this._http.delete<Department>(`${this.departmentUrl}/department/` + name);
  }

  deleteDepartmentById(departmentId: number): Observable<any> {
    return this._http.delete<any>(this.departmentUrl + '/department' + '/deptId/' + departmentId);
  }

  updateDepartment(name: string, department: Department) {
    return this._http.put<Department>(`${this.departmentUrl}/department/` + name, department);
  }
  updateDepartmentListById(departmentId: number, department: Department): Observable<any> {
    return this._http.put<any>(this.departmentUrl + '/department' + '/departmentID/' + departmentId, department);
  }

  getDepartmentByName(name: string) {
    return this._http.get<Department>(`${this.departmentUrl}/getdept/` + name);
  }
  getDepartmentbyId(departmentId: number): Observable<any> {
    return this._http.get<Department>(this.departmentUrl + '/department' + '/deptId/' + departmentId);
  }


  getDepartmentByInstitutionId(id: number): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/department/institutionId/` + id);
  }

  getAllDeactivatedDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=inactive`);
  }

  activateDepartment(departmentId: number): Observable<any> {
    return this._http.patch<any>(`${this.departmentUrl}/department/activate/` + departmentId, {});
  }

}
