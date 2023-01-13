import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { AdminInstitution } from './class/admin-institution';
import { Category } from './class/category';
import { Course } from './class/course';
import { Module } from './class/module';
import { Quiz } from './class/quiz';
import { InstituteAdmin } from './instituteadminprofile/institute-admin';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly baseUrl: string = "http://localhost:8090/";

  private readonly adminInstitutionWar: string = "admininstitution";
  private readonly adminInstitutionURL: string = "/uhpocms/institution?name=all";

  private readonly quizWar: string = "quiz";
  private readonly quizURL: string = "/uhpocms/quiz?title=all";

  private readonly courseWar: string = "course";
  private readonly courseURL: string = "/uhpocms/course?name=all";

  private readonly categoryWar: string = "category";
  private readonly categoryURL: string = "/uhpocms/category?category=all";

  private readonly moduleWar: string = "module";
  private readonly moduleURL: string = "/uhpocms/module?name=all";

  private readonly instituteProfileWar: string = "instituteadmin";
  private readonly instituteProfileURL: string = "/uhpocms/profile?firstName=all";


  constructor(private _http: HttpClient) {

  }

  fetchAllInstitution(): Observable<any> {
    // alert(this.baseUrl + this.adminInstitutionWar + this.adminInstitutionURL)
    return this._http.get<any>(this.baseUrl + this.adminInstitutionWar + this.adminInstitutionURL);
  }

  fetchAllQuizs(): Observable<Quiz[]> {
    // alert(this.baseUrl + this.quizWar + this.quizURL)
    return this._http.get<Quiz[]>(this.baseUrl + this.quizWar + this.quizURL);
  }

  fetchAllCourses(): Observable<Course[]> {
    // alert(this.baseUrl + this.courseWar + this.courseURL)
    return this._http.get<Course[]>(this.baseUrl + this.courseWar + this.courseURL);
  }

  fetchAllCategories(): Observable<Category[]> {
    // alert(this.baseUrl + this.categoryWar + this.categoryURL);
    return this._http.get<Category[]>(this.baseUrl + this.categoryWar + this.categoryURL);
  }

  fetchAllModules(): Observable<Module[]> {
    // alert(this.baseUrl + this.moduleWar + this.moduleURL)
    return this._http.get<Module[]>(this.baseUrl + this.moduleWar + this.moduleURL);
  }

  fetchAllInstituteProfile(): Observable<InstituteAdmin[]> {
    //alert(this.baseUrl + this.instituteProfileWar + this.instituteProfileURL)
    return this._http.get<InstituteAdmin[]>(this.baseUrl + this.instituteProfileWar + this.instituteProfileURL);
  }


}
