import { Component } from '@angular/core';
import { AdminInstitution } from './admin-institution/class/admininstitution';
import { AppService } from './app.service';

import { Category } from './class/category';
import { Course } from './class/course';
import { Module } from './class/module';
import { Quiz } from './class/quiz';
import { Profile } from './profiles/class/profile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'roleAdmin';

  adminInstitutions: AdminInstitution[] = [];
  categories: Category[] = [];
  quizs: Quiz[] = [];
  courses: Course[] = [];
  modules: Module[] = [];
  instituteProfiles: Profile[] = [];

  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    this.loadAdminInstitution();
    this.loadQuizs();
    this.loadCourses();
    this.loadCategories();
    this.loadModules();
    this.loadInstituteProfile();
    //alert(sessionStorage.getItem("instituteprofile"));
  }

  loadAdminInstitution() {
    this._appService.fetchAllInstitution().subscribe(
      (response) => {
        this.adminInstitutions = response;
        sessionStorage.setItem(
          'admininstitution',
          JSON.stringify(this.adminInstitutions)
        );
        // alert("here" + JSON.stringify(this.adminInstitutions));
      },
      (error) => {
        sessionStorage.setItem('admininstitution', '');
      }
    );
  }

  loadQuizs() {
    this._appService.fetchAllQuizs().subscribe(
      (response) => {
        this.quizs = response;
        sessionStorage.setItem('quiz', JSON.stringify(this.quizs));
      },
      (error) => {
        sessionStorage.setItem('quiz', '');
      }
    );
  }
  loadCourses() {
    this._appService.fetchAllCourses().subscribe(
      (response) => {
        this.courses = response;
        // alert("here" + JSON.stringify(this.courses));
        sessionStorage.setItem('course', JSON.stringify(this.courses));
      },
      (error) => {
        sessionStorage.setItem('course', '');
      }
    );
  }
  loadCategories() {
    this._appService.fetchAllCategories().subscribe(
      (response) => {
        this.categories = response;
        sessionStorage.setItem('category', JSON.stringify(this.categories));
      },
      (error) => {
        sessionStorage.setItem('category', '');
      }
    );
  }
  loadModules() {
    this._appService.fetchAllModules().subscribe(
      (response) => {
        this.modules = response;
        sessionStorage.setItem('module', JSON.stringify(this.modules));
      },
      (error) => {
        sessionStorage.setItem('module', '');
      }
    );
  }

  loadInstituteProfile() {
    this._appService.fetchAllInstituteProfile().subscribe(
      (response) => {
        this.instituteProfiles = response;
        sessionStorage.setItem(
          'instituteprofile',
          JSON.stringify(this.instituteProfiles)
        );
      },
      (error) => {
        sessionStorage.setItem('instituteprofile', '');
      }
    );
  }
}
