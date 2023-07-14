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
    private _route: Router,
    private dialogBoxService: DialogBoxService,
    private enrollStudentService:EnrolltostudentService) { }

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

  getDepartmentByInstId(instId: number) {

    instId = this._profile.institutionId;

    this._deptService.getDepartmentsByInstitutionId(instId).subscribe(
      (response: Department[]) => {
        this.departments = response;
        this.departments.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
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
        this.courses = this.courses.filter((elem) => elem.courseIsActive == true)
        this.courses.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1)
        console.log(response);
      }
    )
  }


  ///Function for get profile by role and institution id 
  getProfileByRoleAndInstId(instId: number) {
    let userRole = "teacher";
    instId = this._profile.institutionId;
    // console.log(instId);
    this.profileService.getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
      (response: Profile[]) => {
        this._profileArray = response;
        this._profileArray.map((i) => { i.fullName = i.firstName + ' ' + i.lastName + ' - ' + i.adminEmail; return i; });
        console.log(response)
        // instId = this._profile.institutionId;
        console.log(instId);
        // this.selectAllForDropdownItems(this._profileArray);

        // Fetch student profiles and adding array of profile.
        userRole = "student";
        this.profileService.getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
          (response: Profile[]) => {
            this._profileArray = this._profileArray.concat(response);
            this._profileArray.map((i) => { i.fullName = i.firstName + ' ' + i.lastName + ' - ' + i.adminEmail; return i; });
            console.log(response);
            // instId = this._profile.institutionId;
            console.log(instId);
            this._profileArrCopy = this._profileArray;
            this.selectAllForDropdownItems(this._profileArray);
          }
        );
      }
    )

  }

  // Method to delete assignment by courseId and profileId
  deleteAssignment(courseId: number, profileId: number) {
    this.assignTeacherService.deleteAssignToTeacherByCourseIdAndProfileId(courseId, profileId)
      .subscribe(
        (response) => {

          console.log('Assignment deleted successfully');

        },
        (error) => {

          console.error('Failed to delete assignment', error);

        }
      );
  }



  /////////////////////////////////////////////////disable already assigned teacher/////////////////

  onCourseSelect(courseId: any) {
    // console.log(courseId);

    this.getTeacherByCourseId(courseId);
    this.getStudentByCourseId(courseId);
  }

  getTeacherByCourseId(courseId: any) {
    this.assignTeacherArr = [];
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

  getStudentByCourseId(courseId: any) {

    this.enrolledUsers = [];
    this.enrollStudentService.getStudentByCourseId(courseId).subscribe(
      response => {
        // this.courses = response;

        response.forEach((data: Enrolltostudent) => {
          this.enrolledUsers.push(data.profileId);
          console.log(this.enrolledUsers);
        })
        // Filtering out profiles where adminId matches an enrolledUser
        // console.log(this._profileArray);
        // this._profileArray = this._profileArrCopy;
        // this._profileArray = this._profileArray.filter(profile => !this.enrolledUsers.includes(profile.adminId));
        // console.log(this._profileArray);
         
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
    // Delete the unchecked assignments
    this.unCheckedProfiles.forEach((profileId)=>{
      console.log(profileId);

      this.deleteAssignment(courseId, profileId);
      
      this.assignTeacherArr =  this.assignTeacherArr.filter((element) => element !== profileId);
        console.log(this.assignTeacherArr);
        
    });

    
    for (let i = 0; i < this.selected.length; i++) {

      this.assignTeacher.profileId = this.selected[i];

      this.assignTeacher.courseId = +(this.course.courseId);
      // console.log(JSON.stringify(this.assignTeacher));
      this.assignTeacherService.assignTeacherToCourse(this.assignTeacher).subscribe(
        (response) => {
          this.inserted = true;
          //location.reload();

        }, error => {
          this.inserted = false;
          this.dialogBoxService.open('Failed to assign', 'warning');
        }
      )
    }
    if (this.inserted = true) {
      this.dialogBoxService.open("Assign Course To Teacher successfully !", 'information').then((response) => {
        if (response) {
          location.reload(); // Refresh the page
        }
  
      });
      // location.reload();
    }
    else {
      console.log("Already Course Assigned");
    }
    // this.ngOnInit();
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

  unCheckedProfiles: Set<number> = new Set<number>;
  onChangeSelectedProfiles(event: any, item: any) {
    // alert();
    console.log(item);
    console.log(event);

    const isChecked = event.target.checked;
    if (!isChecked) {
      this.unCheckedProfiles.add(item.value.adminId)
      console.log(this.unCheckedProfiles);
    } else {
      this.unCheckedProfiles.delete(item.value.adminId)
      console.log(this.unCheckedProfiles);
    }


  }
}
