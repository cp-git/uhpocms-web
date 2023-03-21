import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Department } from '../class/department';

// import { InsertDepartmentComponent } from '../insert-department/insert-department.component';

import { environment } from 'environments/environment.development';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly departmentUrl: string;
  private readonly adminInstitutionUrl: string;

  constructor(private _http: HttpClient) {

    //urls from environment code
    this.departmentUrl = environment.departmentUrl;
    this.adminInstitutionUrl = environment.adminInstitutionUrl;

  }

  //service to fetch alldepartments
  fetchAllDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=all`);
  }

  //service to fetch all institutions
  fetchAllInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.adminInstitutionUrl}/institution?name=all`);
  }

  //service to insert department
  insertDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>(`${this.departmentUrl}/department`, department);
  }

  //service to create a new department
  createDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>(`${this.departmentUrl}/dept`, department);
  }

  //service to delete deaprtment by deptname
  deleteDepartment(name: string): Observable<any> {
    return this._http.delete<Department>(`${this.departmentUrl}/department/` + name);
  }

  //service to delete department by dept id
  deleteDepartmentById(departmentId: number): Observable<any> {
    return this._http.delete<any>(this.departmentUrl + '/department' + '/deptId/' + departmentId);
  }

  //service to update department by depat name
  updateDepartment(name: string, department: Department) {
    return this._http.put<Department>(`${this.departmentUrl}/department/` + name, department);
  }

  //service to update department by dept id
  updateDepartmentListById(departmentId: number, department: Department): Observable<any> {
    return this._http.put<any>(this.departmentUrl + '/department' + '/departmentID/' + departmentId, department);
  }

  //service to get dept by dept name
  getDepartmentByName(name: string) {
    return this._http.get<Department>(`${this.departmentUrl}/getdept/` + name);
  }

  // service to get department by dept id
  getDepartmentbyId(departmentId: number): Observable<any> {
    return this._http.get<Department>(this.departmentUrl + '/department' + '/deptId/' + departmentId);
  }

  //service to get dept by provided institution id
  getDepartmentByInstitutionId(id: number): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/department/institutionId/` + id);
  }

  //service to get all inactive departments 
  getAllDeactivatedDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=inactive`);
  }

  //service to activate department
  activateDepartment(departmentId: number): Observable<any> {
    return this._http.patch<any>(`${this.departmentUrl}/department/activate/` + departmentId, {});
  }

}
