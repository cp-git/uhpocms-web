import { Component, HostListener } from '@angular/core';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';

import { Course } from 'app/teacher-course/class/course';



// import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
// import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
// import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';
import { NgSelectModule } from '@ng-select/ng-select';




import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';


import { EnrolltostudentService } from '../service/enrolltostudent.service';
import { Location } from '@angular/common';
import { Enrolltostudent } from '../class/enrolltostudent';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';




@Component({
  selector: 'app-enrollstudent',
  templateUrl: './enrollstudent.component.html',
  styleUrls: ['./enrollstudent.component.css']


})
export class EnrollstudentComponent {

  //variable initialization
  _disablevar: boolean = false;
  _profile = new Profile();

  _profileArray: Profile[] = [];

  _profileArrCopy: Profile[] = [];

  institutions: AdminInstitution[] = [];

  backupInst: AdminInstitution[] = [];

  departments: Department[] = [];

  department = new Department();

  course = new Course();

  courses: Course[] = [];

  enrolledStudent = new Enrolltostudent();

  enrolledStudentArr: Enrolltostudent[] = [];

  end: any;
  size: number = 1;
  loading = false;

  instituteActive: boolean = true;

  maxResults = 10;
  offset = 0;

  selected = [];


  //constructor
  constructor(
    private _institutionService: AdmininstitutionService,
    private _deptService: DepartmentService,
    private courseService: TeacherCourseService,
    private profileService: ProfileService,
    private enrollstuService: EnrolltostudentService,
    private location: Location) { }

  //ngoninit
  ngOnInit() {

    // function to be loaded on page load
    this.getAllInstitution();
  }


  // function to get all institutions
  private getAllInstitution() {
    // fetching all institution
    //console.log("this.selected.length " + this.selected.length)
    this._institutionService.fetchAdminInstitutionList().subscribe(
      (response) => {
        // assigning received data to institutionfo
        this.institutions = response;

        //  cloning array from instituion to backupinst
        this.institutions.forEach((inst) => {
          this.backupInst.push(Object.assign({}, inst));
        });

        // when data not available
        if (this.institutions.length > 0) {
          // this.isHidden = false;
        }
      },
      (error) => {

      }
    );
  }


  //function to get department based on institution id
  getDepartmentByInstId(instId: number) {
    console.log("this.selected.length " + this.selected.length)
    instId = this._profile.institutionId;

    this._deptService.getDepartmentsByInstitutionId(instId).subscribe(
      (response: Department[]) => {
        this.departments = response;

      }
    )
  }


  //function to get courses based on department id
  getCoursesByDeptId(deptId: number) {
    deptId = this.department.id;

    this.courseService.getCourseByDepartmentId(deptId).subscribe(
      (response: Course[]) => {
        this.courses = response;

      }
    )
  }



  //function to get profile based on role and institute id
  getProfileByRoleAndInstId(instId: number) {

    this.selected = [];
    const userRole = "student";
    instId = this._profile.institutionId;

    this.profileService.getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
      (response: Profile[]) => {
        this._profileArray = response;
        this._profileArray.map((i) => { i.fullName = i.firstName + ' ' + i.lastName + ' - ' + i.adminEmail; return i; });

      }
    )

  }


  //Function for assign course to student
  saveEnrolledStudent(courseId: number, profileId: number) {

    this.enrolledStudent.courseId = courseId;
    this.enrolledStudent.profileId = profileId;

    for (let i = 0; i < this.selected.length; i++) {

      this.enrolledStudent.profileId = this.selected[i];
      this.enrollstuService.saveEnrolledStudents(this.enrolledStudent).subscribe(
        (response: any) => {

          if (i == 0) {

            console.log("Student Enrolled Successfully");
            location.reload();
          } else {
            console.log("Already Enrolled Course OR Failed to Enrolled")
          }
        }
      )
    }
  }

  // checkFields() {
  //   // Check if any fields are empty
  //   if (!this.admininstitution.adminInstitutionName || !this.department.name || !this.course.courseName|| !) {
  //     // If any field is empty, disable the button
  //     this.buttonDisabled = true;
  //   } else {
  //     // If all fields have a value, enable the button
  //     this.buttonDisabled = false;
  //   }
  // }
  formComplete: boolean = false;


  isFormComplete(): boolean {
    if (this._profile.institutionId && this.department.id && this.course.courseId && this.selected.length > 0) {
      // All required fields are filled out
      this.formComplete = true;
    } else {
      // Some required fields are missing
      this.formComplete = false;
    }
    return this.formComplete;
  }
  //function to enable submit button only after all fields selection
  disablefunc() {

    if ((this.selected.length != 0) && (this.course.courseId != undefined) && (this.department.id != undefined)) {
      this._disablevar = true;
    }
    else {
      this._disablevar = false;
    }

  }





  //back button route
  back() {
    this.location.back();

  }

}
