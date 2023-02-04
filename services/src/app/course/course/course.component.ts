import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/admindepartment/admin-institution/admin-institution';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  isVisible: boolean = true;

  _backupModule = new Map();


  // array of course
  
  course = new Course();
  courses: Course[] = [];  //for drop down data

  institutions: AdminInstitution[] = [];
  institution = new AdminInstitution();
  sessionData: any;
  data: any;




 


  constructor(private _service: CourseService ,private  _instService : InstitutionSeriveService,   private _activatedRoute: ActivatedRoute, private _route: Router) {
   

  }
  ngOnInit(): void {

    this.getAllCourses();

    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      this.getAllCourses();
      this.getAllInstitutes();
    }


  }
  getAllInstitutes() {
    this._instService._getAllInstitutions().subscribe(
      data=>{
        this.institutions = data;
        
        this.institutions.forEach(institutionData => { this._backupModule.set(institutionData.adminInstitutionName, (Object.assign({}, institutionData))) });
        if (this.institutions.length > 0) {
          this.isVisible = false;
        }
      }

    )
  }
  getAllCourses() {
    this._service._getAllCourses().subscribe(
      data=>{
        this.courses = data;
        
        this.courses.forEach(courseData => { this._backupModule.set(courseData.courseName, (Object.assign({}, courseData))) });
        if (this.courses.length > 0) {
          this.isVisible = false;
        }
      }

    )
  }
  
  Add()
  {
    this._route.navigate(['addcourse'])
  }

  updatecourse(course:Course)
  {
    this._route.navigate(['updatecourse'])
  }
  Home() {
    this._route.navigate(['demo'])
  }
}
