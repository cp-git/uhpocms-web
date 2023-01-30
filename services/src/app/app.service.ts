import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Category } from './class/category';
import { Course } from './class/course';
import { Module } from './class/module';
import { Quiz } from './class/quiz';
import { InstituteAdmin } from './instituteadminprofile/institute-admin';
import { environment } from 'environments/environment.development';
import { AdminInstitution } from './admindepartment/admin-institution/admin-institution';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly adminInstitutionURL: string;
  private readonly quizURL: string;
  private readonly courseURL: string;
  private readonly categoryURL: string;
  private readonly moduleURL: string;
  private readonly instituteProfileURL: string;


  constructor(private _http: HttpClient) {

    this.adminInstitutionURL = `${environment.adminInstitutionUrl}/institution?name=all`;
    this.quizURL = `${environment.quizUrl}/quiz?title=all`;
    this.courseURL = `${environment.courseUrl}/course?name=all`;
    this.categoryURL = `${environment.categoryUrl}/category?category=all`;
    this.moduleURL = `${environment.moduleUrl}/module?name=all`;
    this.instituteProfileURL = `${environment.instituteAdmin}/profile?firstName=all`;
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

  fetchAllInstituteProfile(): Observable<InstituteAdmin[]> {
    //alert(this.baseUrl + this.instituteProfileWar + this.instituteProfileURL)
    return this._http.get<InstituteAdmin[]>(this.instituteProfileURL);
  }


}
