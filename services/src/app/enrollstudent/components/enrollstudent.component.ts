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
import { Assignteacher } from 'app/assigncoursetoteacher/class/assignteacher';
import { AssigncourseteacherService } from 'app/assigncoursetoteacher/services/assigncourseteacher.service';
import { EnrolltostudentService } from '../service/enrolltostudent.service';
import { Location } from '@angular/common';
import { Enrolltostudent } from '../class/enrolltostudent';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';

import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-enrollstudent',
  templateUrl: './enrollstudent.component.html',
  styleUrls: ['./enrollstudent.component.css']


})
export class EnrollstudentComponent {

  moduleName = 'Enroll Students To Course'

  //variable initialization
  _disablevar: boolean = false;

  _profile = new Profile();
  _profileArray: Profile[] = [];
  _profileArrCopy: Profile[] = [];
  institutions: AdminInstitution[] = [];
  instId: number = 0;
  profileId: any;
  backupInst: AdminInstitution[] = [];
  departments: Department[] = [];
  department = new Department();
  course = new Course();
  courses: Course[] = [];
  teacherCourses: Course[] = [];
  enrolledStudent = new Enrolltostudent();
  enrolledStudentArr: any[] = [];
  end: any;
  size: number = 1;
  loading = false;
  instituteActive: boolean = true;
  maxResults = 10;
  offset = 0;
  selected = [];
  prevSelected = [];
  courseProgress = new CourseProgress();
  // for buttons to view
  showAddButton: boolean = false;
  showActivateButton: boolean = false;

  assignedUsers: any[] = [];
  displayInstituteLogo: any;
  instituteId: any;
  sessionData: any;
  data: any;

  profiles: Profile[] = []; // list of inactive Profile
  profile: Profile;

  userRole: any;
  //constructor
  constructor(
    private _institutionService: AdmininstitutionService,
    private _deptService: DepartmentService,
    private courseService: TeacherCourseService,
    private assignTeacherService: AssigncourseteacherService,
    private profileService: ProfileService,
    private enrollstuService: EnrolltostudentService,
    private location: Location,
    private dialogBoxService: DialogBoxService,
    private courprogServ: CourseProgressService) {
    this.profile = new Profile();
    this.displayInstituteLogo = `${environment.adminInstitutionUrl}/institution/getFileById`;

    this.profileId = sessionStorage.getItem("profileId");

    this.userRole = sessionStorage.getItem('userRole');
  }
  //ngoninit
  ngOnInit() {
    // function to be loaded on page load
    this.loadProfiles(this.profileId);
    // this.getAllInstitution();
    this.EnrollCoursesToStudentBasedOnRole(this.userRole);
    // this.getDepartmentByProfileId(this.profileId);
    // this.getInstitutionByProfileId(this.profileId);
    // this.getAssignedCoursesOfTeacher(this.profileId);
    // this.getDepartmentsByInstId(this.instId);

  }
  // function to get all institutions
  private getAllInstitution() {
    // fetching all institution
    //console.log("this.selected.length " + this.selected.length)
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
      }
    );
  }

  loadProfiles(profileId: number) {
    // alert(studentId);
    try {
      this.sessionData = sessionStorage.getItem('instituteprofile');
      //alert(JSON.stringify(this.sessionData));
      this.data = JSON.parse(this.sessionData);
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].adminId == this.profileId) {
          this.profile = this.data;
          this.instituteId = this.data[i].institutionId;
          //  alert(this.studentName);
          console.log(this.profile.firstName, this.profile.lastName, this.profile.fullName, "  + ++++ + + ", this.instituteId);
          this.instituteId = this.data[i].institutionId;


          //  alert(JSON.stringify(this.profileInstituteId));
          break; // Assuming the profileId is unique, exit the loop after finding the matching profile
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  selectAllForDropdownItems(items: any[]) {
    let allSelect = (items: any[]) => {
      items.forEach(element => {
        element['selectedAllGroup'] = 'selectedAllGroup';
      });
    };
    allSelect(items);
  }
  // function to get departments based on institution ID
  getDepartmentsByInstId(instId: number) {
    this.department = {} as Department;
    this.course = {} as Course;
    console.log("this.selected.length " + this.selected.length);

    switch (this.userRole) {
      case 'admin':
      case 'coadmin':
        instId = this._profile.institutionId;
        this.courses =[];
        this._deptService.getDepartmentsByInstitutionId(instId).subscribe(
          (response) => {
            this.departments = response;
            this.departments.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
          },

        );
        break;
      case 'teacher':
        this._deptService.getDepartmentsByProfileId(this.profileId).subscribe(
          (response) => {
            this.departments = response;
          },

        );
        break;

    }
  }
  onChangeInstitution() {
    this.department.id = 0;
this.course.courseId=0;
  }

  onChangeDepartment() {
    this.course.courseId=0;
  }
  getTeacherByCourseId(courseId: any) {
    this.assignedUsers = [];
    this.assignTeacherService.getTeacherByCourseId(courseId).subscribe(
      response => {
        // this.courses = response;
        console.log(response);
        response.forEach((data: Assignteacher) => {
          this.assignedUsers.push(data.profileId);
          console.log("xyz++++++++++++++++++++" + this.assignedUsers);

        })
      },
      error => {
        console.log("failed to fetch data");
      }
    );
  }
  //function to get courses based on department id
  getCoursesByDeptId(deptId: number) {
    this.course = {} as Course;
    switch (this.userRole) {
      case 'admin' || 'coadmin':


        deptId = this.department.id;
        this.courseService.getCourseByDepartmentId(deptId).subscribe(
          (response) => {
            this.courses = response;
            this.courses = this.courses.filter((elem) => elem.courseIsActive == true)
            this.courses.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1)
            console.log("admin" + this.courses);
          }
        );
        break;
      case 'teacher':
        this.courseService.getCourseByDepartmentIdAndProfileId(deptId, this.profileId).subscribe(
          (response) => {
            console.log("coursesteacher " + JSON.stringify(response));
            this.courses = response;

            this.courses = this.courses.filter((elem) => elem.courseIsActive == true)
          }
        );
        break;
    }
  }




  getCoursesByDeptIdandProfileId(deptId: number, profileId: number) {

    deptId = this.department.id;
    this.courseService.getCourseByDepartmentIdAndProfileId(deptId, profileId).subscribe(
      (response) => {
        // console.log("coursesteacher " + JSON.stringify(response));
        this.courses = response;

        this.courses = this.courses.filter((elem) => elem.courseIsActive == true)

      }

    )

  }

  //function to get profile based on role and institute id
  getProfileByRoleAndInstId(instId: number) {
    this.selected = [];
    const userRole = "student";
    instId = this._profile.institutionId;
    this.profileService.getProfileByRoleAndInstitutionId(userRole, instId).subscribe(
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


  //////////////////////////////////////////////////////////////////////////////////////////////////////
  ///disablestudent who already enroll
  /////////////////////////////////////////////////////////////////////////////////////////////////////


  getStudentByCourseId(courseId: any) {

    this.enrolledStudentArr = [];
    this.enrollstuService.getStudentByCourseId(courseId).subscribe(
      response => {
        // this.courses = response;


        console.log(response);




        response.forEach((data: Enrolltostudent) => {
          this.enrolledStudentArr.push(data.profileId);
          console.log(this.enrolledStudentArr);
        })
      },
      error => {
        console.log("failed to fetch data");
      }
    );
  }
  //function to get department based on profile id
  getDepartmentByProfileId(profileId: number) {
    console.log("this.selected.length " + this.selected.length)
    // profileId = this._profile.profileId;
    this._deptService.getDepartmentsByProfileId(profileId).subscribe(
      (response) => {
        this.departments = response;
        this.instId = this.departments[0].institutionId;
        console.log("deptbyprofile" + this.departments);
      }

    )
  }

  //function to get Institution based on profile id
  getInstitutionByProfileId(profileId: number) {
    console.log("this.selected.length " + this.selected.length)
    // profileId = this._profile.profileId;
    this._institutionService.getInstitutionByProfileId(profileId).subscribe(
      (response) => {
        this.institutions = response;

        console.log("instbyprofile" + this.institutions);
      }

    )
  }
  //getting courses assigned to teacher using profileId
  getAssignedCoursesOfTeacher(teacherId: number) {
    this.courseService.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {
        console.log("courses " + JSON.stringify(data));


        // this.getAllModules();
        this.courses.forEach(course => {
          data.forEach((tcourse: any) => {

            if (course.courseId === tcourse.courseId) {
              this.teacherCourses.push(tcourse);
            }
          })
        })
      },
      error => {
        console.log(error);
      }
    );
  }
  private EnrollCoursesToStudentBasedOnRole(userRole: string) {
    console.log(userRole);

    switch (userRole) {
      case 'admin' || 'coadmin':
        this.getAllInstitution();
        this.getDepartmentsByInstId(this.instId);

        break;
      case 'teacher':

        this.getDepartmentByProfileId(this.profileId);
        this.getInstitutionByProfileId(this.profileId);
        this.getAssignedCoursesOfTeacher(this.profileId);

        break;

    }
  }
  onOptionSelected(item: any) {
    console.log(JSON.stringify(item))
    console.log(this.selected);
    // this.selected = this.selected.filter(profileId=> this.assignTeacherArr.includes(item.adminId));
    this.selected.forEach((profileId, index) => {
      if (this.enrolledStudentArr.includes(profileId)) this.selected.splice(index, 1);
    });
  }
  ngDoCheck() {
    if (!this.arraysEqual(this.selected, this.prevSelected)) {
      // console.log('Items changed:', this.selected);
      for (let i = this.selected.length - 1; i >= 0; i--) {
        const profileId = this.selected[i];
        if (this.enrolledStudentArr.includes(profileId)) {
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
  onCourseSelect(courseId: any) {
    // console.log(courseId);
    this.getTeacherByCourseId(courseId);
    this.getStudentByCourseId(courseId);
  }
  //Function for assign course to student
  inserted: boolean = false;
  saveEnrolledStudent(courseId: number, profileId: number) {
    let isStudentEnrolled = false;
    this.inserted = false;
    this.enrolledStudent.courseId = courseId;
    this.enrolledStudent.profileId = profileId;
    // Check if any selected user is already assigned
    const isAlreadyAssigned = this.selected.some((profileId) => this.assignedUsers.includes(profileId));
    if (isAlreadyAssigned) {
      this.dialogBoxService.open("students are already assigned to the course.", 'information');
      return; // Exit the function, no further actions needed
    }
    // Subtract enrolledUsers from selected array
    this.selected = this.selected.filter((profileId) => !this.assignedUsers.includes(profileId));
    // Delete the unchecked assignments
    this.unCheckedProfiles.forEach((profileId) => {
      console.log(profileId);

      this.deleteEnrollStudent(courseId, profileId);

      this.enrolledStudentArr = this.enrolledStudentArr.filter((element) => element !== profileId);
      console.log(this.enrolledStudentArr);

    });
    for (let i = 0; i < this.selected.length; i++) {
      this.courseProgress = new CourseProgress();
      let responseEnrollStu = new Enrolltostudent();
      this.enrolledStudent.profileId = this.selected[i];
      this.enrollstuService.saveEnrolledStudents(this.enrolledStudent).subscribe(
        (response) => {
          isStudentEnrolled = true;
          // if (i == 0) {
          // console.log("Student Enrolled Successfully");
          // location.reload();
          // this.dialogBoxService.open("Students enrolled to course successfully !", 'information');

          responseEnrollStu = response;
          console.log(responseEnrollStu)
          console.log(response)
          // this.dialogBoxService.open("Students enrolled to course successfully !", 'information');
          this.courseProgress.id = 0;
          this.courseProgress.courseId = courseId;
          this.courseProgress.studentId = this.selected[i];
          this.courseProgress.currentAssignNo = 1;
          this.courseProgress.currentModuleNo = 1;
          this.courseProgress.currentUnitNo = 1;
          this.courseProgress.grade = 0;
          this.courseProgress.progress = 0;


          this.courprogServ.addCourseProgressStatus(this.courseProgress).subscribe(
            (data) => {



            }
          )

          // }
        }
      )
    }

    if (this.selected.length > 0 && this.unCheckedProfiles.size > 0) {
      this.dialogBoxService.open("Students enrolled and removed from the course!", 'information').then((response) => {
        if (response) {
          location.reload(); // Refresh the page
        }
      });
    } else if (this.selected.length > 0) {
      this.dialogBoxService.open("Students enrolled to the course successfully!", 'information').then((response) => {
        if (response) {
          location.reload(); // Refresh the page
        }
      });
    } else if (this.unCheckedProfiles.size > 0) {
      this.dialogBoxService.open("Students removed from the course!", 'information').then((response) => {
        if (response) {
          location.reload(); // Refresh the page
        }
      });
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
  private arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  //back button route
  back() {
    this.location.back();
  }

  // Method to delete assignment by courseId and profileId
  deleteEnrollStudent(courseId: number, profileId: number) {
    // Delete the enrolled student
    this.enrollstuService.deleteEnrollStudentByCourseIdAndProfileId(courseId, profileId)
      .subscribe(
        (response) => {
          console.log('Enroll Student deleted successfully');

          // Delete the corresponding CourseProgress entry
          this.courprogServ.deleteCourseProgressByCourseIdAndStudentId(courseId, profileId)
            .subscribe(
              (response) => {
                console.log('CourseProgress entry deleted successfully');
              },
              (error) => {
                console.error('Failed to delete CourseProgress entry', error);
              }
            );
        },
        (error) => {
          console.error('Failed to delete Enroll student', error);
        }
      );
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
    this.selected = this.selected.filter((profileId) => !this.assignedUsers.includes(profileId));


  }

}
