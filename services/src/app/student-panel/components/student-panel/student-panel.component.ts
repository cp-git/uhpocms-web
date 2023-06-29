import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dataOne from '../../../dataOne.json';
import * as dataThree from '../../../dataThree.json';

import { ChartdataComponent } from 'app/charts/components/chartdata/chartdata.component';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/class/course';
import { AccesscontrolService } from 'app/accesscontrol/services/accesscontrol.service';
import { Accesscontrol } from 'app/accesscontrol/class/accesscontrol';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent {


  course: Course = new Course();
  @ViewChild(ChartdataComponent) dChart: any;

  //doughnut chart data array
  doughCharts: any = [];
  charts: any = [];

  currentIndex: number = 0;

  // Declare class properties
  profileId: any;
  courseProgressArr: CourseProgress[] = [];
  userName!: string;
  userId: any;
  accessControlData: Accesscontrol;

  userPermissions: AuthUserPermission[] = [];;
  modulePermissionIds: Set<number> = new Set<number>();
  authModule = userModule;


  constructor(private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private courseProgServ: CourseProgressService,
    private courseService: TeacherCourseService,
    private accessControlService: AccesscontrolService
  ) {
    this.accessControlData = new Accesscontrol();
    this.loadAllPermissions();

  }


  // Initialize component properties with current route parameters
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId')
    this.loadAccessControl();

    //code to realod the page by navigating here to this page
    this._route.navigate(['../'], { relativeTo: this._activatedRoute });
    this.profileId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];

    //function to display charts on page load
    this.getAllCourseProgress();

  }

  loadAllPermissions() {
    try {
      let sessionData: any;
      sessionData = sessionStorage.getItem('permissions');
      console.log(sessionData);
      let data = JSON.parse(sessionData);
      this.userPermissions = data;
      this.modulePermissionIds.add(this.userPermissions[0].moduleId)
      this.userPermissions.forEach(permission => {
        this.modulePermissionIds.add(permission.moduleId);
      });
      console.log(this.modulePermissionIds);

    }
    catch (err) {
      console.log("Error", err);
    }

  }

  loadAccessControl() {

    this.accessControlService.getAccessControlByUserId(this.userId).subscribe(
      (response) => {
        this.accessControlData = response;
      }
    );
    console.log(this.accessControlData);

  }

  //function to get all data for course progress 
  async getAllCourseProgress() {
    let filteredCouProgArr: CourseProgress[] = [];
    this.courseProgServ.getAllCourseProgress().subscribe(
      async (response) => {
        this.courseProgressArr = response;

        filteredCouProgArr = this.courseProgressArr.filter((element) => element.studentId == this.profileId);
        for (let i = 0; i < filteredCouProgArr.length; i++) {
          const remainingPercentage: number = 100 - filteredCouProgArr[i].progress;

          await this.getCourseNameById(filteredCouProgArr[i].courseId);
          console.log("this.course.courseName")
          console.log(this.course.courseName)
          if (this.course.courseIsActive == true) {
            console.log("Entered in if loop")
            this.charts[i] = [filteredCouProgArr[i].progress, remainingPercentage, this.course.courseName];
            this.doughCharts.push(this.charts[i])
            console.log()
          }
        }


      }
    )
  }

  //code for next button on progress panel
  next() {

    this.currentIndex += 3;
    this.getAllCourseProgress();

  }

  //code for previous button on progress panel
  previous() {

    this.currentIndex -= 3;
    this.getAllCourseProgress();
  }

  //code to display course by providing course id
  getCourseNameById(courseId: number) {
    return new Promise<void>((resolve, reject) => {
      this.courseService.getCourseByCourseId(courseId).subscribe(
        (data) => {
          this.course = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });
  }


  // Navigate to student course page with current profileId
  RedirectToStudentCourse() {
    this._route.navigate(['/Course']);
  }


  // Navigate to quiz page with 'student' role
  RedirectToQuiz() {
    const role = 'student';
    this._route.navigate(['quiz', role]);
  }

  // Navigate to course page with 'student' role
  RedirectToCourse() {
    const role = 'student';
    this._route.navigate(['course/userrole/', role]);
  }

  // Navigate to login page
  RedirectTOLogin() {
    sessionStorage.removeItem('profileId');
    sessionStorage.removeItem('userId');
    this._route.navigate(['authenticationlogin'])
  }

  //Navigate to student module page with current profileId
  RedirectToStudentModule() {
    this._route.navigate(['studentmodule', { id: this.profileId }]);
  }

  //to navigate to the announcement page for the current student
  redirectToNotification() {
    this._route.navigate(['announcement/student', { id: this.profileId }])
  }



}
