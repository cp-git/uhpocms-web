import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChartdataComponent } from 'app/charts/components/chartdata/chartdata.component';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/class/course';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { environment } from 'environments/environment.development';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent {
  course: Course = new Course();
  @ViewChild(ChartdataComponent) dChart: any;
  doughCharts: any = [];
  charts: any = [];
  currentIndex: number = 0;
  profileId: any;
  courseProgressArr: CourseProgress[] = [];
  userName!: string;
  displayInstituteLogo: any;
  instituteId: any;
  sessionData: any;
  data: any;

  profiles: Profile[] = []; // list of inactive Profile
  profile: Profile;
  userId: any;
  private isComponentLoaded = false;

  userPermissions: AuthUserPermission[] = [];;
  modulePermissionIds: Set<number> = new Set<number>();
  authModule = userModule;
  actualUserRole: any;
  constructor(private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private courseProgServ: CourseProgressService,
    private courseService: TeacherCourseService,
    private profileServ: ProfileService,
    private _auth: AuthUserService
  ) {
    this.profile = new Profile();
    this.displayInstituteLogo = `${environment.adminInstitutionUrl}/institution/getFileById`;

    this.profileId = sessionStorage.getItem("profileId");
    this.actualUserRole = sessionStorage.getItem("actualUserRole");

    // Calling function to get permissions from session storage
    this.loadAllPermissions();



  }

  // Initialize component properties with current route parameters
  ngOnInit(): void {
    if (!this._auth.isUserLoggedIn()) {
      this._route.navigate(['authenticationlogin']);
    } else {

      this.loadProfiles(this.profileId);
      this.userId = sessionStorage.getItem('userId')

      //code to realod the page by navigating here to this page
      this._route.navigate(['../'], { relativeTo: this._activatedRoute });
      this.profileId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];

      this.getAllCourseProgress();
    }
  }


  // function for loading permissions from session storage
  loadAllPermissions() {
    try {
      let sessionData: any;
      sessionData = sessionStorage.getItem('permissions');
      // console.log(sessionData);

      // converting string json into json object
      let data = JSON.parse(sessionData);
      this.userPermissions = data;

      // adding module ids in array ( module ids which are accessible to user)
      this.userPermissions.forEach(permission => {
        this.modulePermissionIds.add(permission.moduleId);
      });
      // console.log(this.modulePermissionIds);

    }
    catch (err) {
      console.log("Error", err);
    }

  }


  //function to get all data for course progress 
  async getAllCourseProgress() {
    // location.reload();

    let filteredCouProgArr: CourseProgress[] = [];
    this.courseProgServ.getAllCourseProgress().subscribe(
      async (response) => {
        this.courseProgressArr = response;
        filteredCouProgArr = this.courseProgressArr.filter((element) => element.studentId == this.profileId);
        console.log(filteredCouProgArr);

        for (let i = 0; i < filteredCouProgArr.length; i++) {
          const remainingPercentage: number = 100 - filteredCouProgArr[i].progress;
          await this.getCourseNameById(filteredCouProgArr[i].courseId);
          if (this.course.courseIsActive === true) {
            this.charts[i] = [filteredCouProgArr[i].progress, remainingPercentage, this.course.courseName];
            this.doughCharts.push(this.charts[i]);
          }
        }
        this.filterDoughCharts();
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


  filterDoughCharts() {
    this.doughCharts = this.doughCharts.filter((chart: any[], index: any, self: any[]) =>
      index === self.findIndex((c) => c[2] === chart[2])
    );
  }

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
      );
    });
  }

  next() {
    this.currentIndex += 3;
    this.getAllCourseProgress();
  }

  previous() {
    this.currentIndex -= 3;
    this.getAllCourseProgress();
  }

  RedirectToStudentCourse() {
    this._route.navigate(['/Course']);
  }

  RedirectToQuiz() {
    const role = 'student';
    this._route.navigate(['quiz', role]);
  }

  RedirectToCourse() {
    const role = 'student';
    this._route.navigate(['course/userrole/', role]);
  }

  RedirectTOLogin() {
    this._auth.logout()
    this._route.navigate(['']);
  }

  RedirectToStudentModule() {
    this._route.navigate(['studentmodule', { id: this.profileId }]);
  }

  redirectToNotification() {
    this._route.navigate(['announcement/student', { id: this.profileId }]);
  }

  //navigates the user to courses panel for all courses
  redirectToAllCourses() {
    this._route.navigate(['Courses']);
  }
}
function resolve() {
  throw new Error('Function not implemented.');
}

