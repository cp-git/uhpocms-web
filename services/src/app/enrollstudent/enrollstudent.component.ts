import { Component } from '@angular/core';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/service/course.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';

import { EnrolltostudentService } from './service/enrolltostudent.service';
import { Location } from '@angular/common';
import { Enrolltostudent } from './class/enrolltostudent';

@Component({
  selector: 'app-enrollstudent',
  templateUrl: './enrollstudent.component.html',
  styleUrls: ['./enrollstudent.component.css']
})
export class EnrollstudentComponent {

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


  instituteActive: boolean = true;


  categories = [
    { id: 1, name: 'Laravel' },
    { id: 2, name: 'Codeigniter' },
    { id: 3, name: 'React' },
    { id: 4, name: 'PHP' },
    { id: 5, name: 'Angular' },
    { id: 6, name: 'Vue' },
    { id: 7, name: 'JQuery', disabled: true },
    { id: 8, name: 'Javascript' },
  ];

  selected = [

  ];

  getSelectedValue() {
    console.log("getSelectedValue")
    console.log(this.selected);
  }

  constructor(private _institutionService: AdmininstitutionService, private _deptService: DepartmentService, private courseService: CourseService, private profileService: InstituteAdminServiceService, private enrollstuService: EnrolltostudentService, private location: Location) { }
  ngOnInit() {
    this.getAllInstitution();




    console.log(this._profile.institutionId);
  }


  private getAllInstitution() {
    // fetching all institution
    this._institutionService.fetchAdminInstitutionList().subscribe(
      (response) => {
        // assigning received data to institution
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
        // this.displayEmptyRow();
        console.log('No data in table ');
      }
    );
  }

  getDepartmentByInstId(instId: number) {

    instId = this._profile.institutionId;

    this._deptService.getDepartmentByInstitutionId(instId).subscribe(
      (response) => {
        this.departments = response;
        console.log("Inside getDepartmentByInstId")
        console.log(response)

        //  this.getProfileByRoleAndInstId(instId);

      }
    )
  }

  getCoursesByDeptId(deptId: number) {

    console.log(this.department);
    console.log(deptId);
    deptId = this.department.id;

    this.courseService.getCourseByDepartmentId(deptId).subscribe(
      (response) => {
        this.courses = response;

        console.log(response);
      }
    )
  }


  getProfileByRoleAndInstId(instId: number) {
    const userRole = "student";
    instId = this._profile.institutionId;
    // console.log(instId);
    this.profileService._getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
      (response) => {
        this._profileArray = response;
        this._profileArray.map((i) => { i.fullName = i.firstName + ' ' + i.lastName + ' - ' + i.adminEmail; return i; });
        console.log(response)
        // instId = this._profile.institutionId;
        console.log(instId);

      }
    )

  }


  saveEnrolledStudent(courseId: number, profileId: number) {

    // const profileIdList = [1, 2, 3];

    console.log("Profile array copy down");
    console.log(this._profileArrCopy);

    console.log(this._profileArray);
    this.enrolledStudent.courseId = courseId;
    this.enrolledStudent.profileId = profileId;

    console.log(this.enrolledStudent)


    for (let i = 0; i < this.selected.length; i++) {

      this.enrolledStudent.profileId = this.selected[i];
      this.enrollstuService.saveEnrolledStudents(this.enrolledStudent).subscribe(
        (response) => {

          alert("Student Enrolled Successfully");
        }
      )

    }



  }

  back() {
    this.location.back();

  }

}
