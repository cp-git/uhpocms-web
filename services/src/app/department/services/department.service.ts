import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'app/admindepartment/department';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly departmentUrl: string;
  private readonly adminInstitutionUrl: string;
  departments: Department[] = [];
  constructor(private _http: HttpClient) {


    // this.departmentUrl = environment.departmentUrl;
    this.adminInstitutionUrl = environment.adminInstitutionUrl;

    this.departmentUrl = `http://localhost:8090/department/uhpocms`;
    // this.adminInstitutionUrl = `http://localhost:8090/department/uhpocms`;

  }

  getAllDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=all`);
  }

  getAllInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.adminInstitutionUrl}/institution?name=all`);
  }

  insertDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>(`${this.departmentUrl}/department`, department);
  }

  deleteDepartment(name: string): Observable<any> {
    return this._http.delete<Department>(`${this.departmentUrl}/department/` + name);
  }

  updateDepartment(id: number, department: Department) {
    return this._http.put<Department>(`${this.departmentUrl}/department/departmentID/` + id, department);
  }

  getDepartmentByName(name: string) {
    return this._http.get<Department>(`${this.departmentUrl}/getdept/` + name);
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
