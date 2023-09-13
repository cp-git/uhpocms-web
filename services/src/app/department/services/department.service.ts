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

  constructor(private _http: HttpClient, private cache: DataServiceCache) {
    //urls from environment code
    this.departmentUrl = environment.departmentUrl;
    this.adminInstitutionUrl = environment.adminInstitutionUrl;

  }

  //////////////////////////// SERVICE - GETTING ALL DEPARTMENTS ////////////////////////////////
  getAllDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=all`);
  }



  /////////////////////////// SERVICE - INSERTION OF DEPARTMENT ////////////////////////////////
  insertDepartment(department: Department): Observable<Department> {
    return this._http.post<Department>(`${this.departmentUrl}/department`, department);
  }



  ////////////////////////// SERVICE - UPDATE DEPARTMENT BY DEPARTMENT ID ////////////////////
  updateDepartment(id: number, department: Department) {
    return this._http.put<Department>(`${this.departmentUrl}/department/departmentID/` + id, department);
  }



  //////////////////////////// SERVICE - GETTING DEPARTMENT BY INSTITUTION ID //////////////////
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
        this.cache.setDataInCache((`${this.departmentUrl}/department/institutionId/` + id), data);
      })
    );
  }

  /////////////////////////// SERVICE - GETTING THE ALL DEACTIVATED DEPARTMENTS ////////////////////////
  getAllDeactivatedDepartments(): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/getdept?name=inactive`);
  }


  ////////////////////////// SERVICE - ACTIVATE DEPARTMENT BY DEPARTMENT ID /////////////////////////
  activateDepartment(departmentId: number): Observable<any> {
    return this._http.patch<any>(`${this.departmentUrl}/department/activate/` + departmentId, {});
  }


  //////////////////////////  SERVICE - DELETE DEPARTMENT BY DEPARTMENT ID ////////////////////////////
  deleteDepartmentById(departmentId: number): Observable<any> {
    return this._http.delete<any>(this.departmentUrl + '/department' + '/deptId/' + departmentId);
  }

  /////////////////////////  SERVICE - GETTING DEPARTMENT OF ASSIGNED COURSES BASED ON PROFILE ID //////////////////
  getDepartmentsOfAssignCoursesByProfileId(id: number): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/department/profile/` + id);
  }

  /////////////////////// SERVICE - GETTING INACTIVE DEPARTMENT BY INSTITUTION ID ///////////////////////////////////
  getInactiveDepartmentsByInstitutionId(id: number): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/department/inactive/instid/` + id);
  }


  ///////////////////////// SERVICE - GET DEPARTMENT BY PROFILE  ID ///////////////////////////////////////////////
  getDepartmentOfProfileId(profileId: number): Observable<Department[]> {
    return this._http.get<Department[]>(`${this.departmentUrl}/department/profileid/${profileId}`);
  }
}
