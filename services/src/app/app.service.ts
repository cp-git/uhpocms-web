import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './class/category';
import { Course } from './teacher-course/class/course';
import { Module } from './class/module';
import { Quiz } from './class/quiz';
import { Profile } from './profiles/class/profile';


import { environment } from 'environments/environment.development';
import { AdminInstitution } from './admin-institution/class/admininstitution';
import { AuthUserPermissionService } from './permissions/services/authUserPermission/auth-user-permission.service';
import { AuthUserPermission } from './permissions/class/auth-user-permission';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly adminInstitutionURL: string;
  private readonly quizURL: string;
  private readonly courseURL: string;
  private readonly categoryURL: string;
  private readonly moduleURL: string;
  private readonly instituteProfileURL: string;

  userPermissions: AuthUserPermission[] = [];

  constructor(private _http: HttpClient,
    private userPermissionService: AuthUserPermissionService) {

    this.adminInstitutionURL = `${environment.adminInstitutionUrl}/institution?name=all`;
    this.quizURL = `${environment.quizUrl}/quiz?title=all`;
    this.courseURL = `${environment.courseUrl}/course?name=all`;
    this.categoryURL = `${environment.categoryUrl}/category?category=all`;
    this.moduleURL = `${environment.moduleUrl}/module?name=all`;
    this.instituteProfileURL = `${environment.instituteAdminUrl}/profile?firstName=all`;
  }

  fetchAllInstitution(): Observable<AdminInstitution[]> {
    // alert(this.adminInstitutionURL)
    return this._http.get<AdminInstitution[]>(this.adminInstitutionURL);
  }

  fetchAllQuizs(): Observable<Quiz[]> {
    // alert(this.baseUrl + this.quizWar + this.quizURL)
    return this._http.get<Quiz[]>(this.quizURL);
  }

  fetchAllCourses(): Observable<Course[]> {
    // alert(this.baseUrl + this.courseWar + this.courseURL)
    return this._http.get<Course[]>(this.courseURL);
  }

  fetchAllCategories(): Observable<Category[]> {
    // alert(this.baseUrl + this.categoryWar + this.categoryURL);
    return this._http.get<Category[]>(this.categoryURL);
  }

  fetchAllModules(): Observable<Module[]> {
    // alert(this.baseUrl + this.moduleWar + this.moduleURL)
    return this._http.get<Module[]>(this.moduleURL);
  }

  fetchAllInstituteProfile(): Observable<Profile[]> {
    //alert(this.baseUrl + this.instituteProfileWar + this.instituteProfileURL)
    return this._http.get<Profile[]>(this.instituteProfileURL);
  }

  // fetchUserPermissionsByUserIdAndRoleId(userRoleId: any, userId: any) {
  //   this.userPermissionService.getAllPermissionsByRoleIdAndUserId(userRoleId, userId).subscribe(
  //     (response) => {
  //       console.log(response);

  //       this.userPermissions = response;
  //     }
  //   );
  // }
}
