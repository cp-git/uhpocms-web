import { Component, HostListener } from '@angular/core';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';
import { Course } from 'app/course/course';
import { CourseService } from 'app/course/service/course.service';
import { Location } from '@angular/common';
import { AdminInstitution } from 'app/instituteadminprofile/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';
import { AssigncourseteacherService } from '../assigncourseteacher.service';
import { Assignteacher } from '../assignteacher';

@Component({
  selector: 'app-assigncoursetoteacher',
  templateUrl: './assigncoursetoteacher.component.html',
  styleUrls: ['./assigncoursetoteacher.component.css']
})
export class AssigncoursetoteacherComponent {

  _profile = new InstituteAdmin();

  _profileArray: InstituteAdmin[] = [];

  _profileArrCopy: InstituteAdmin[] = [];

  institutions: AdminInstitution[] = [];

  backupInst: AdminInstitution[] = [];

  departments: Department[] = [];

  department = new Department();

  course = new Course();

  courses: Course[] = [];

  assignTeacher = new Assignteacher();
  assignTeacherArr: Assignteacher[] = [];


  end: any;
  size: number = 1;
  loading = false;

  instituteActive: boolean = true;

  maxResults = 10;
  offset = 0;

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

  constructor(private _institutionService: AdmininstitutionService, private _deptService: DepartmentService, private courseService: CourseService, private profileService: InstituteAdminServiceService, private assignTeacherService: AssigncourseteacherService, private location: Location) { }

  ngOnInit() {
    this.getAllInstitution();
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
    const userRole = "teacher";
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


  saveAssignTeacher(courseId: number, profileId: number) {
    // alert(courseId + " and " + profileId);
    // const profileIdList = [1, 2, 3];

    console.log("Profile array copy down");
    console.log(this._profileArrCopy);

    console.log(this._profileArray);
    this.assignTeacher.courseId = (courseId);
    this.assignTeacher.profileId = profileId;

    console.log(this.assignTeacher)


    for (let i = 0; i < this.selected.length; i++) {

      this.assignTeacher.profileId = this.selected[i];

      this.assignTeacher.courseId = +(this.course.courseId);
      // alert(JSON.stringify(this.assignTeacher));
      this.assignTeacherService.assignTeacherToCourse(this.assignTeacher).subscribe(
        (response) => {

          alert("Teacher Assign Successfully");

        }, error => {
          alert("Failed to Assign course");
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
    this.assignTeacherService.setParams({
      maxResults: this.maxResults,
      offset: this.offset,
    });
    this.offset += 1;
    this._profileArray;
    // this.service.getTestsList()
    //     .pipe(takeWhile(() => this.alive)).subscribe(() => {
    //     this.loading = false
    // })
  }



  back() {
    this.location.back();

  }
}
