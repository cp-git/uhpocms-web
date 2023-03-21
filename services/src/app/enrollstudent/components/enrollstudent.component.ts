import { Component, HostListener } from '@angular/core';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';

import { Course } from 'app/course/course';
import { CourseService } from 'app/course/service/course.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';
import { NgSelectModule } from '@ng-select/ng-select';

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
  _profile = new InstituteAdmin();

  _profileArray: InstituteAdmin[] = [];

  _profileArrCopy: InstituteAdmin[] = [];

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
  constructor(private _institutionService: AdmininstitutionService, private _deptService: DepartmentService, private courseService: CourseService, private profileService: InstituteAdminServiceService, private enrollstuService: EnrolltostudentService, private location: Location) { }

  //ngoninit
  ngOnInit() {

    // function to be loaded on page load
    this.getAllInstitution();
  }


  // function to get all institutions
  private getAllInstitution() {
    // fetching all institution
    console.log("this.selected.length " + this.selected.length)
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
      (response) => {
        this.departments = response;

      }
    )
  }


  //function to get courses based on department id
  getCoursesByDeptId(deptId: number) {
    deptId = this.department.id;

    this.courseService.getCourseByDepartmentId(deptId).subscribe(
      (response) => {
        this.courses = response;

      }
    )
  }



  //function to get profile based on role and institute id
  getProfileByRoleAndInstId(instId: number) {

    this.selected = [];
    const userRole = "student";
    instId = this._profile.institutionId;

    this.profileService._getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
      (response) => {
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
        (response) => {

          if (i == 0) {

            alert("Student Enrolled Successfully");
          }
        }
      )
    }
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
