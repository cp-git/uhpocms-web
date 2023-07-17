import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartdataComponent } from 'app/charts/components/chartdata/chartdata.component';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/class/course';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { environment } from 'environments/environment.development';
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
  displayInstituteLogo : any;
  instituteId : any;
  sessionData : any;
  data:any;
  
  profiles: Profile[] = []; // list of inactive Profile
  profile: Profile;

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private courseProgServ: CourseProgressService,
    private courseService: TeacherCourseService,
    private profileServ: ProfileService
  ) {this.profile = new Profile();
    this.displayInstituteLogo = `${environment.adminInstitutionUrl}/institution/getFileById`;
   
    this.profileId = sessionStorage.getItem("profileId");}

  ngOnInit(): void {
    this.loadProfiles(this.profileId);
    this._route.navigate(['../'], { relativeTo: this._activatedRoute });
    this.profileId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    this.getAllCourseProgress();
  }

  async getAllCourseProgress() {
    let filteredCouProgArr: CourseProgress[] = [];
    this.courseProgServ.getAllCourseProgress().subscribe(
      async (response) => {
        this.courseProgressArr = response;
        filteredCouProgArr = this.courseProgressArr.filter((element) => element.studentId == this.profileId);
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
    sessionStorage.removeItem('profileId');
    sessionStorage.removeItem('userId');
    this._route.navigate(['authenticationlogin']);
  }

  RedirectToStudentModule() {
    this._route.navigate(['studentmodule', { id: this.profileId }]);
  }

  redirectToNotification() {
    this._route.navigate(['announcement/student', { id: this.profileId }]);
  }
}
