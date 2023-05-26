import { Component, HostListener } from '@angular/core';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';

import { Course } from 'app/teacher-course/class/course';

import { Location } from '@angular/common';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { AssigncourseteacherService } from '../../services/assigncourseteacher.service';
import { Assignteacher } from '../../class/assignteacher';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';

@Component({
  selector: 'app-assigncoursetoteacher',
  templateUrl: './assigncoursetoteacher.component.html',
  styleUrls: ['./assigncoursetoteacher.component.css']
})
export class AssigncoursetoteacherComponent {
  moduleName = 'Assign Course To Teacher';
  _profile = new Profile();

  _profileArray: Profile[] = [];

  _profileArrCopy: Profile[] = [];

  institutions: AdminInstitution[] = [];

  backupInst: AdminInstitution[] = [];

  departments: Department[] = [];

  department = new Department();

  course = new Course();

  courses: Course[] = [];

  assignTeacher = new Assignteacher();
  assignTeacherArr: any[] = [];

  userName!: string;
  adminId: any;

  end: any;
  size: number = 1;
  loading = false;

  instituteActive: boolean = true;

  maxResults = 10;
  offset = 0;

  selected = [];
  prevSelected = [];

  // for buttons to view
  showAddButton: boolean = false;
  showActivateButton: boolean = false;

  getSelectedValue() {
    console.log("getSelectedValue")
    console.log(this.selected);
  }

  constructor(
    private _institutionService: AdmininstitutionService,
    private _deptService: DepartmentService,
    private courseService: TeacherCourseService,
    private profileService: ProfileService,
    private assignTeacherService: AssigncourseteacherService,
    private location: Location,
    private _activatedRoute: ActivatedRoute,
    private _route: Router) { }

  isFormComplete(): boolean {
    // Check if all required fields are filled in
    if (this._profile.institutionId && this.department.id && this.course.courseId && this.selected.length > 0) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)
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


  shouldEnableVirtualScroll(_profileArrayForSelect: Profile[], size: number): boolean {

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

    this._deptService.getDepartmentsByInstitutionId(instId).subscribe(
      (response: Department[]) => {
        this.departments = response;
        console.log("Inside getDepartmentByInstId")
        console.log(response)

        //  this.getProfileByRoleAndInstId(instId);

      }
    )
  }

  //function for get Course by department id
  getCoursesByDeptId(deptId: number) {
    console.log(this.department);
    console.log(deptId);
    deptId = this.department.id;

    this.courseService.getCourseByDepartmentId(deptId).subscribe(
      (response: Course[]) => {
        this.courses = response;
        this.courses = this.courses.filter((elem)=>elem.courseIsActive == true)
        console.log(response);
      }
    )
  }


  ///Function for get profile by role and institution id 
  getProfileByRoleAndInstId(instId: number) {
    const userRole = "teacher";
    instId = this._profile.institutionId;
    // console.log(instId);
    this.profileService.getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
      (response: Profile[]) => {
        this._profileArray = response;
        this._profileArray.map((i) => { i.fullName = i.firstName + ' ' + i.lastName + ' - ' + i.adminEmail; return i; });
        console.log(response)
        // instId = this._profile.institutionId;
        console.log(instId);
        this.selectAllForDropdownItems(this._profileArray);
      }
    )

  }



  /////////////////////////////////////////////////disable already assigned teacher/////////////////

  onCourseSelect(courseId: any) {
    // console.log(courseId);

    this.getTeacherByCourseId(courseId);

  }

  getTeacherByCourseId(courseId: any) {
    this.assignTeacherService.getTeacherByCourseId(courseId).subscribe(
      response => {
        // this.courses = response;
        console.log(response);
        response.forEach((data: Assignteacher) => {
          this.assignTeacherArr.push(data.profileId);
          console.log(this.assignTeacherArr);

        })
      },
      error => {
        console.log("failed to fetch data");
      }
    );
  }

  onOptionSelected(item: any) {
    console.log(JSON.stringify(item))
    console.log(this.selected);

    // this.selected = this.selected.filter(profileId=> this.assignTeacherArr.includes(item.adminId));
    this.selected.forEach((profileId, index) => {
      if (this.assignTeacherArr.includes(profileId)) this.selected.splice(index, 1);
    });
  }

  ngDoCheck() {

    if (!this.arraysEqual(this.selected, this.prevSelected)) {
      // console.log('Items changed:', this.selected);
      for (let i = this.selected.length - 1; i >= 0; i--) {
        const profileId = this.selected[i];
        if (this.assignTeacherArr.includes(profileId)) {
          this.selected.splice(i, 1);
        }
      }
      ;
      //  console.log('new items changed:', this.selected);
      this.prevSelected = [...this.selected];
    }

    // if (this.selected.length !== this.prevSelected.length) {
    //   console.log('Selected items changed:', this.selected);
    //   this.selected.forEach((profileId,index)=>{
    //     if(this.assignTeacherArr.includes(profileId)) this.selected.splice(index,1);
    //  });
    //  console.log('new items changed:', this.selected);

    //   this.prevSelected = [...this.selected];
    // }
  }
  private arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }
  inserted: boolean = false;
  //function for save the course id with profile ID
  saveAssignTeacher(courseId: number, profileId: number) {
    this.inserted = false;
    console.log("Profile array copy down");
    console.log(this._profileArrCopy);

    console.log(this._profileArray);
    this.assignTeacher.courseId = (courseId);
    this.assignTeacher.profileId = profileId;
    for (let i = 0; i < this.selected.length; i++) {

      this.assignTeacher.profileId = this.selected[i];

      this.assignTeacher.courseId = +(this.course.courseId);
      // console.log(JSON.stringify(this.assignTeacher));
      this.assignTeacherService.assignTeacherToCourse(this.assignTeacher).subscribe(
        (response) => {
          this.inserted = true;
          location.reload();

        }, error => {
          this.inserted = false;
          console.log("Failed to Assign course");
        }
      )
    }
    if (this.inserted = true) {
      console.log("Teacher assigned successfully");
    }
    else {
      console.log("Already Course Assigned");
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
  }



  back() {
    this._route.navigate(['adminmodule/admin', this.userName])

  }
}
