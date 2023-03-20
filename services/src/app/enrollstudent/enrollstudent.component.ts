import { Component, HostListener } from '@angular/core';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/service/course.service';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';
import { NgSelectModule } from '@ng-select/ng-select';

import { EnrolltostudentService } from './service/enrolltostudent.service';
import { Location } from '@angular/common';
import { Enrolltostudent } from './class/enrolltostudent';

@Component({
  selector: 'app-enrollstudent',
  templateUrl: './enrollstudent.component.html',
  styleUrls: ['./enrollstudent.component.css']


})
export class EnrollstudentComponent {

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

  getSelectedValue() {
    console.log("getSelectedValue")
    console.log(this.selected);
  }

  constructor(private _institutionService: AdmininstitutionService, private _deptService: DepartmentService, private courseService: CourseService, private profileService: InstituteAdminServiceService, private enrollstuService: EnrolltostudentService, private location: Location) { }
  ngOnInit() {
    this.getAllInstitution();

    console.log("couresId  " + this.course.courseId)

    console.log("this.selected.length " + this.selected.length)

    console.log(this._profile.institutionId);
  }


  selectAllForDropdownItems(items: any[]) {
    let allSelect = (items: any[]) => {
      items.forEach(element => {
        element['selectedAllGroup'] = 'selectedAllGroup';
      });
    };

    allSelect(items);
  }


  shouldEnableVirtualScroll(_profileArrayForSelect: InstituteAdmin[], size: number): boolean {

    console.log("size" + size);
    console.log("_profileArrayForSelect" + _profileArrayForSelect)

    if (!_profileArrayForSelect) {
      return false;
    }
    console.log(_profileArrayForSelect.length > size)

    return _profileArrayForSelect.length > size;
  }

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
        // this.displayEmptyRow();
        console.log('No data in table ');
      }
    );
  }

  getDepartmentByInstId(instId: number) {
    console.log("this.selected.length " + this.selected.length)
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

    console.log("this.selected.length " + this.selected.length)
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

    console.log("this.selected.length " + this.selected.length)
    this.selected = [];
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
        this.selectAllForDropdownItems(this._profileArray);
      }
    )

  }


  //Function for assign course to student
  saveEnrolledStudent(courseId: number, profileId: number) {
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

          if (i == 0) {

            alert("Student Enrolled Successfully");
          }
        }
      )
    }
  }

  onScrollToEnd() {
    console.log('onscrollEend');
    this.fetchMore();
  }



  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.loading || this.size <= this._profileArray.length) {
      return;
    }

    if ((event + 0) >= this._profileArray.length) {
      this.fetchMore();
    }
  }

  fetchMore() {
    this.loading = true;
    this.enrollstuService.setParams({
      maxResults: this.maxResults,
      offset: this.offset,
    });
    this.offset += 1;
    this._profileArray;

  }


  disablefunc() {

    console.log("this.selected.length " + this.selected.length)

    if ((this.selected.length != 0) && (this.course.courseId != undefined) && (this.department.id != undefined)) {
      this._disablevar = true;

    }

    else {
      this._disablevar = false;
    }
    console.log("diasable var   " + this._disablevar)
  }


  back() {
    this.location.back();

  }

}
