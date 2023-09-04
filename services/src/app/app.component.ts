import { Component, OnInit } from '@angular/core';
import { AdminInstitution } from './admin-institution/class/admininstitution';
import { AppService } from './app.service';

import { Category } from './class/category';
import { Course } from './teacher-course/class/course';
import { Module } from './class/module';
import { Quiz } from './class/quiz';
import { Profile } from './profiles/class/profile';
import { AuthUserPermissionService } from './permissions/services/authUserPermission/auth-user-permission.service';
import { Subject } from 'rxjs/internal/Subject';
import { SharedDataServiceService } from './question/services/shared-data-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'roleAdmin';

  adminInstitutions: AdminInstitution[] = [];
  categories: Category[] = [];
  quizs: Quiz[] = [];
  actInactquizs: Quiz[] = [];
  courses: Course[] = [];
  modules: Module[] = [];
  instituteProfiles: Profile[] = [];


  userId: any;
  userRoleId: any;
  private refreshDataSubject: Subject<void> = new Subject<void>();

  constructor(private _appService: AppService, private sharedDataService: SharedDataServiceService,
    private userPermissionService: AuthUserPermissionService, private activatedRoute: ActivatedRoute,) {
    this.userId = sessionStorage.getItem('userId');
    this.userRoleId = sessionStorage.getItem('userRoleId');
  }

  ngOnInit(): void {
    this.loadAdminInstitution();
    this.loadQuizs();
    this.loadCourses();
    this.loadCategories();
    this.loadModules();
    this.loadInstituteProfile();
    this.loadActInacQuizs();
    //alert(sessionStorage.getItem("instituteprofile"));

    //   this.sharedDataService.onDataRefresh().subscribe(() => {
    // // Clear the session storage and reload the updated data
    // sessionStorage.removeItem('actinacquiz');
    //       this.loadActInacQuizs();
    //     });


    //   // Initial load of quizzes
    //   this.loadActInacQuizs();

  }
  onAppQuestionAnswerBackButtonClicked() {
    // Emit a value to notify the app-question-answer component to refresh data
    this.refreshDataSubject.next();
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

  loadActInacQuizs() {
    this._appService.fetchAllActInactQuizs().subscribe(
      (response) => {
        this.actInactquizs = response;
        sessionStorage.setItem('actinacquiz', JSON.stringify(this.actInactquizs));
      },
      (error) => {
        sessionStorage.setItem('actinacquiz', '');
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


  // loadUserPermissions(userRoleId: any, userId: any) {
  //   return this._appService.fetchUserPermissionsByUserIdAndRoleId(userRoleId, userId);
  // }
}
