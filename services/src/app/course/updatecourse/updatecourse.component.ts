import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.css']
})
export class UpdatecourseComponent {

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

    

    if (sessionStorage.getItem('authenticatedUser') === null) {
      this._route.navigate(['']);
    } else {
      
      this.getAllInstitutes();
    }




  }


  // getModule() {
  //   const moduleName:any = this.route.snapshot.params['moduleName'];
        
     
  //     this._service.getModule(moduleName).subscribe(
  //       data => {
  //         console.log(data);
  //         this.module=data;
  //       },
  //       error => {
  //         alert("Data not found");
  //       }
  //     );
  //   }
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

  updateCourse(updatedCourse:Course) {

  
    this.course = ({} as Course);
    
    this.course.courseName = updatedCourse.courseName;
    this.course.courseDescription= updatedCourse.courseDescription;
    this.course.courseIsActive = true
    this.course.courseCode = updatedCourse.courseCode;
    this.course.courseType = updatedCourse.courseType;
    this.course.passingScore = updatedCourse.passingScore;
    this.course.instId = updatedCourse.instId;
    
    
    this._service.updateCourseList(this.course.courseName, this.course).subscribe(
      data => {
        console.log(data)
        // this.module = data;
  
        this._backupModule.set(this.course.courseCode, (Object.assign({}, data)));
        // this.ngOnInit();
        alert("Data updated successfuly");
        this._route.navigate(['course'])
        if (this.courses.length > 0) {
          this.isVisible = false;
        }
      },
      error => {
        alert("Failed to update");
      }
    )
  
  
  }


  back()
  {
    this._route.navigate(['course']);
  }

}
