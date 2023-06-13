import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { environment } from 'environments/environment.development';
import { Observable, of, tap } from 'rxjs';
import { Department } from '../class/department';
import { DataServiceCache } from 'app/cache/service/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly departmentUrl: string;
  private readonly adminInstitutionUrl: string;
  departments: Department[] = [];
 
  constructor(private _http: HttpClient,private cache: DataServiceCache) {
    //urls from environment code
    this.departmentUrl = environment.departmentUrl;
    this.adminInstitutionUrl = environment.adminInstitutionUrl;

  }

  //service to fetch alldepartments
  getAllDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=all`);
  }

  //service to fetch all institutions
  getAllInstitutions(): Observable<AdminInstitution[]> {
    return this._http.get<AdminInstitution[]>(`${this.adminInstitutionUrl}/institution?name=all`);
  }

  //service to insert department
  insertDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>("http://localhost:8090/department/uhpocms/department", department);
  }

  //service to delete deaprtment by deptname
  deleteDepartment(name: string): Observable<any> {
    return this._http.delete<Department>(`${this.departmentUrl}/department/` + name);
  }

  //service to update department by dept id
  updateDepartment(id: number, department: Department) {
    return this._http.put<Department>(`${this.departmentUrl}/department/departmentID/` + id, department);
  }

  //service to get dept by dept name
  getDepartmentByName(name: string) {
    return this._http.get<Department>(`${this.departmentUrl}/getdept/` + name);
  }

  //service to get dept by provided institution id
  getDepartmentsByInstitutionId(id: number): Observable<Department[]> {
    const cachedData = this.cache.getDataFromCache(`${this.departmentUrl}/department/institutionId/` + id);
    if (cachedData) {
      return of(cachedData);
    }

    return this._http.get<Department[]>(`${this.departmentUrl}/department/institutionId/` + id).pipe(
    //   tap(data => this.cache.setDataInCache(`${this.courseProgressUrl}/courseprog?id=all`, data))
    // );

    tap(data => {
      // Update cache with new data
      this.cache.removeFromCache(`${this.departmentUrl}/department/institutionId/` + id);
      this.cache.setDataInCache((`${this.departmentUrl}/department/institutionId/` + id),data);
    })
  );
  }

  //service to get all inactive departments
  getAllDeactivatedDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=inactive`);
  }


  //service to activate department
  activateDepartment(departmentId: number): Observable<any> {
    return this._http.patch<any>(`${this.departmentUrl}/department/activate/` + departmentId, {});
  }

  // service to get department by dept id
  getDepartmentbyId(departmentId: number): Observable<any> {
    return this._http.get<Department>(this.departmentUrl + '/department' + '/deptId/' + departmentId);
  }

  //service to update department by depat name
  updateDepartmentByName(name: string, department: Department) {
    return this._http.put<Department>(`${this.departmentUrl}/department/` + name, department);
  }

  //service to delete department by dept id
  deleteDepartmentById(departmentId: number): Observable<any> {
    return this._http.delete<any>(this.departmentUrl + '/department' + '/deptId/' + departmentId);
  }

  //service to get dept by provided profile id
  getDepartmentsByProfileId(id: number): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/department/profile/` + id);
  }


}
