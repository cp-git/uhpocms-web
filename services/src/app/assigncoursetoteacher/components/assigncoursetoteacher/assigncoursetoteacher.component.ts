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
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { Enrolltostudent } from 'app/enrollstudent/class/enrolltostudent';
import { EnrolltostudentService } from 'app/enrollstudent/service/enrolltostudent.service';
import { InstituteServicesService } from 'app/institute-details/services/institute-services.service';
@Component({
  selector: 'app-assigncoursetoteacher',
  templateUrl: './assigncoursetoteacher.component.html',
  styleUrls: ['./assigncoursetoteacher.component.css']
})
export class AssigncoursetoteacherComponent {
  moduleName = 'Assign Course To User';
  _profile = new Profile();
  _disablevar: boolean = false;
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
  enrolledUsers: any[] = [];
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

  profileId: any;
  userRole: any;
  getSelectedValue() {

  }

  constructor(
    private _institutionService: AdmininstitutionService,
    private _deptService: DepartmentService,
    private courseService: TeacherCourseService,
    private profileService: ProfileService,
    private assignTeacherService: AssigncourseteacherService,
    private location: Location,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private dialogBoxService: DialogBoxService,
    private enrollStudentService: EnrolltostudentService) {

    this.profileId = sessionStorage.getItem('profileId');
    this.userRole = sessionStorage.getItem('userRole');
  }

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

    // this.getAllInstitution();
    this.getDataBasedOnRole(this.userRole);

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



    if (!_profileArrayForSelect) {
      return false;
    }


    return _profileArrayForSelect.length > size;
  }


  ////////////////////////////////////////////  GETTING THE LIST OF INSTITUTIONS   ////////////////////////////////////
  private getAllInstitution() {

    // fetching all institution
    this._institutionService.fetchAdminInstitutionList().subscribe(
      (response) => {
        // assigning received data to institutionfo
        this.institutions = response;
        this.institutions.sort((a, b) => a.adminInstitutionName.toLowerCase() > b.adminInstitutionName.toLowerCase() ? 1 : -1)

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


  /////////////////////////////////////////////   GET DEPARTMENT BY INSTITUTE ID  //////////////////////////////////////
  getDepartmentByInstId(instId: number) {

    instId = this._profile.institutionId;
    this.courses = [];
    this._deptService.getDepartmentsByInstitutionId(instId).subscribe(
      (response: Department[]) => {
        this.departments = response;
        this.departments.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)


        //  this.getProfileByRoleAndInstId(instId);

      }
    )
  }
  onChangeInstitution() {
    this.department.id = 0;
    this.course.courseId = 0;
  }

  onChangeDepartment() {
    this.course.courseId = 0;
  }
  //function for get Course by department id

  ////////////////////////////    GET COURSES BY DEPARTMENT ID  //////////////////////////////////////////
  getCoursesByDeptId(deptId: number) {

    deptId = this.department.id;

    this.courseService.getCourseByDepartmentId(deptId).subscribe(
      (response: Course[]) => {
        this.courses = response;
        this.courses = this.courses.filter((elem) => elem.courseIsActive == true)
        this.courses.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1)

      }
    )
  }

  //////////////////////////////////  GET PROFILE BASED ON ROLE AND INSTITUTE ID
  getProfileByRoleAndInstId(instId: number) {
    let userRole = "teacher";
    instId = this._profile.institutionId;

    this.profileService.getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
      (response: Profile[]) => {
        this._profileArray = response;
        this._profileArray.map((i) => { i.fullName = i.firstName + ' ' + i.lastName + ' - ' + i.adminEmail; return i; });

        // instId = this._profile.institutionId;

        // this.selectAllForDropdownItems(this._profileArray);

        // Fetch student profiles and adding array of profile.
        userRole = "student";
        this.profileService.getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
          (response: Profile[]) => {
            this._profileArray = this._profileArray.concat(response);
            this._profileArray.map((i) => { i.fullName = i.firstName + ' ' + i.lastName + ' - ' + i.adminEmail; return i; });

            // instId = this._profile.institutionId;

            this._profileArrCopy = this._profileArray;
            this.selectAllForDropdownItems(this._profileArray);
          }
        );
      }
    )

  }

  ////////////////////////   DELETE ASSIGN TEACHER USING COURSE ID AND PROFILE ID   //////////////////////////////////////
  deleteAssignment(courseId: number, profileId: number) {
    this.assignTeacherService.deleteAssignToTeacherByCourseIdAndProfileId(courseId, profileId)
      .subscribe(
        (response) => {


        },
        (error) => {

          console.error('Failed to delete assignment', error);

        }
      );
  }



  /////////////////////////////////////////////////disable already assigned teacher/////////////////

  onCourseSelect(courseId: any) {


    this.getTeacherByCourseId(courseId);
    this.getStudentByCourseId(courseId);
  }


  //////////////////////////////////    GET TEACHER BY COURSE ID   ///////////////////////////////////////
  getTeacherByCourseId(courseId: any) {
    this.assignTeacherArr = [];
    this.assignTeacherService.getTeacherByCourseId(courseId).subscribe(
      response => {
        // this.courses = response;

        response.forEach((data: Assignteacher) => {
          this.assignTeacherArr.push(data.profileId);


        })
      },
      error => {
        console.log("failed to fetch data");
      }
    );
  }

  /////////////////////////////////////////////  GET STUDENT BY COURSE ID /////////////////////////////////
  getStudentByCourseId(courseId: any) {

    this.enrolledUsers = [];
    this.enrollStudentService.getStudentByCourseId(courseId).subscribe(
      response => {
        // this.courses = response;

        response.forEach((data: Enrolltostudent) => {
          this.enrolledUsers.push(data.profileId);

        })
        // Filtering out profiles where adminId matches an enrolledUser

        // this._profileArray = this._profileArrCopy;
        // this._profileArray = this._profileArray.filter(profile => !this.enrolledUsers.includes(profile.adminId));


      },
      error => {
        console.log("failed to fetch data");
      }
    );
  }


  onOptionSelected(item: any) {


    // this.selected = this.selected.filter(profileId=> this.assignTeacherArr.includes(item.adminId));
    this.selected.forEach((profileId, index) => {
      if (this.assignTeacherArr.includes(profileId)) this.selected.splice(index, 1);
    });
  }

  ngDoCheck() {

    if (!this.arraysEqual(this.selected, this.prevSelected)) {

      for (let i = this.selected.length - 1; i >= 0; i--) {
        const profileId = this.selected[i];
        if (this.assignTeacherArr.includes(profileId)) {
          this.selected.splice(i, 1);
        }
      }
      ;

      this.prevSelected = [...this.selected];
    }


  }


  disablefunc() {
    if ((this.selected.length != 0) && (this.course.courseId != 0) && (this.department.id != 0)) {
      this._disablevar = true;
    }
    else {
      this._disablevar = false;
    }
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

  //////////////////////////////////////////  ASSIGNING COURSE TO TEACHER  //////////////////////////////////////////////
  saveAssignTeacher(courseId: number, profileId: number) {

    this.inserted = false;
    this.assignTeacher.courseId = (courseId);
    this.assignTeacher.profileId = profileId;
    // Check if any selected user is already assigned
    const isAlreadyAssigned = this.selected.some((profileId) => this.enrolledUsers.includes(profileId));
    if (isAlreadyAssigned) {
      this.dialogBoxService.open("Already assigned to the course.", 'information');
      return; // Exit the function, no further actions needed

    }
    // Subtract enrolledUsers from selected array
    this.selected = this.selected.filter((profileId) => !this.enrolledUsers.includes(profileId));
    // Delete the unchecked assignments
    this.unCheckedProfiles.forEach((profileId) => {
      this.deleteAssignment(courseId, profileId);
      this.assignTeacherArr = this.assignTeacherArr.filter((element) => element !== profileId);
    });


    for (let i = 0; i < this.selected.length; i++) {
      this.assignTeacher.profileId = this.selected[i];
      this.assignTeacher.courseId = +(this.course.courseId);
      this.assignTeacherService.assignTeacherToCourse(this.assignTeacher).subscribe(
        (response) => {
          this.inserted = true;
        },
      );
    }
    if (this.selected.length > 0 && this.unCheckedProfiles.size > 0) {
      this.dialogBoxService.open("Users assigned and removed from the course!", 'information').then((response) => {
        if (response) {
          location.reload(); // Refresh the page
        }
      });
    } else if (this.selected.length > 0) {
      this.dialogBoxService.open("Users assigned to the course successfully!", 'information').then((response) => {
        if (response) {
          location.reload(); // Refresh the page
        }
      });
    } else if (this.unCheckedProfiles.size > 0) {
      this.dialogBoxService.open("Users removed from the course!", 'information').then((response) => {
        if (response) {
          location.reload(); // Refresh the page
        }
      });
    }
  }
  // this.ngOnInit();


  onScrollToEnd() {

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
    // this._route.navigate(['adminmodule/admin', this.userName])
    this.location.back();

  }

  unCheckedProfiles: Set<number> = new Set<number>;
  onChangeSelectedProfiles(event: any, item: any) {
    const isChecked = event.target.checked;
    if (!isChecked) {
      this.unCheckedProfiles.add(item.value.adminId);
    } else {
      this.unCheckedProfiles.delete(item.value.adminId);
    }

    // Update selected array to exclude unchecked profiles that are in enrolledUsers
    this.selected = this.selected.filter((profileId) => !this.unCheckedProfiles.has(profileId));
  }

  // Function to get data based on role
  getDataBasedOnRole(userRole: any) {

    switch (userRole) {
      case 'admin' || 'coadmin':
        this.getAllInstitution();
        break;

      default:
        this.getInsitutionByProfileId(this.profileId);
    }
  }

  //////////////////////////////  GET INSTITUTION BY PROFILE ID   /////////////////////////////////////////

  getInsitutionByProfileId(profileId: any) {
    this._institutionService.getInstitutionByProfileId(profileId).subscribe(
      (data) => {
        this.institutions = data;
      }
    );
  }
}
