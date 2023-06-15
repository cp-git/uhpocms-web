import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { AssignCourseToTeacherService } from 'app/displayAssignedCourseToTeacher/services/teacher-course.service';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { BarChartComponent } from 'app/charts/components/bar-chart/bar-chart.component';
import { ChartdataComponent } from 'app/charts/components/chartdata/chartdata.component';

import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';

@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.css']
})
export class TeacherPanelComponent {

  course: Course = new Course();
  @ViewChild(BarChartComponent) bChart: any;
  @ViewChild(ChartdataComponent) dChart: any;
  @ViewChild('appChartData', { static: false })
  appChartData!: ElementRef;
  //doughnut chart data array
  barCharts: any = [];
  criteriaVar: number = 0;

  currentIndex: number = 0;
  dchartcurrentIndex: number = 0;
  popupDataValue: any;
  popupDataLabel: any;
  courses: Course[] = [];
  courseIds: number[] = [];
  courseProgressArr: CourseProgress[] = [];
  teacherId: any;
  userName!: string;
  bodyText = 'This text can be updated in modal 1';
  // studProgDetailArr: [string, string, number] = ['','',0];
  studProgDetailArr: any[] = [];
  courseProgArr: CourseProgress[] = [];
  clickedCourse: Course = new Course();
  barClicked: boolean = false;
  closeButtonStatus: boolean = true;


  constructor(private renderer: Renderer2, private _route: Router, private _activatedRoute: ActivatedRoute, private courseProgServ: CourseProgressService, private courseService: TeacherCourseService, private assignCouServ: AssignCourseToTeacherService, private profileServ: ProfileService) {

  }


  ngAfterViewInit() {

    const appChartDataWidth = this.appChartData.nativeElement.offsetWidth;
    const horizontalElement = this.bChart.nativeElement.querySelector('.horizontal');
    horizontalElement.style.width = appChartDataWidth + 'px';

  }

  ngOnInit(): void {
    this._route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          location.reload();
        }
      }
    });

    this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.teacherId)
    this._route.navigate(['../'], { relativeTo: this._activatedRoute });
    this.getAllCourseProgress();
    //String initialized so that at start it should be null
    this.clickedCourse.courseName = '';


  }



  //-------------------------------------------------------------------
  displayPopupStyle = "none";




  async handleRightClickData(data: { value: any; label: string }, courseId: number) {
    this.dchartcurrentIndex = 0;
    this.barClicked = true;

    console.log(this.barClicked)
    let courseProgressArr: CourseProgress[] = [];
    let filteredCourseProgressArr: CourseProgress[] = [];
    console.log("Function called")
    // Perform actions with the data
    console.log('Received right-click data:', data);

    this.popupDataValue = data.value;
    this.popupDataLabel = data.label;
    console.log('Received right-click data:', this.popupDataValue, this.popupDataLabel);
    console.log(courseId)

    const rangeArray = this.popupDataLabel.split("-"); // Split the string into an array of two elements

    const startValue = parseInt(rangeArray[0]); // Parse the first element as an integer
    const endValue = parseInt(rangeArray[1]); // Parse the second element as an integer

    await this.getCourseNameById(courseId);



    console.log(startValue); // Output: 26
    console.log(endValue); // Output: 75
    // console.log( parseInt(this.popupDataLabel))
    this.courseProgServ.getAllCourseProgress().subscribe(
      (data) => {
        console.log(startValue); // Output: 26
        console.log(endValue); // Output: 75
        courseProgressArr = data;
        filteredCourseProgressArr = courseProgressArr.filter((elem) => elem.courseId == courseId && ((elem.progress >= startValue) && (elem.progress <= endValue)))

        console.log(filteredCourseProgressArr)
        this.courseProgressArr = filteredCourseProgressArr

      }
    ),
      (error: any) => { error }
    this.getStudentNamesandCourProgress();
  }
  //-------------------------------------------------------------------
  getStudentNamesandCourProgress() {
    this.closeButtonStatus = false;
    this.studProgDetailArr = [];
    let profile: Profile = new Profile();

    console.log(this.courseProgressArr);

    for (let i = 0; i < this.courseProgressArr.length; i++) {
      console.log("Entered in for loop");
      const remainingPercentage: number = 100 - this.courseProgressArr[i].progress;


      this.profileServ.getProfileByAdminId(this.courseProgressArr[i].studentId).subscribe(
        (data) => {
          profile = data;
          console.log(i)
          console.log(profile);
          this.studProgDetailArr.push([this.courseProgressArr[i].progress, remainingPercentage, profile.firstName + ' ' + profile.lastName]);

          // Check if all the data has been retrieved

        }
      );

    }
    console.log(this.studProgDetailArr);
  }


  closeButton() {
    this.closeButtonStatus = true;
    this.clickedCourse.courseName = '';
    this.barClicked = false;

  }



  // --------------------------------------------------------------------------------------------------------

  //fnction to get all data for course progress 
  async getAllCourseProgress() {

    this.courseProgServ.getAllCourseProgress().subscribe(
      async (response) => {
        this.courseProgressArr = response;

        await this.getAllCourseIds();

        console.log(this.courseIds);
        for (let m = 0; m < this.courseIds.length; m++) {
          let courseName: String = ' ';
          let cnt1 = 0;
          let cnt2 = 0;
          let cnt3 = 0;
          let cnt4 = 0;
          let totalStudsArr: CourseProgress[] = [];


          // filteredCouProgArr = this.courseProgressArr.filter((element)=>element.courseId == this.courseIds[i]))
          //  for(let i=0; i<this.courseProgressArr.length; i++){

          //  if(this.courseIds[m] == this.courseProgressArr[i].courseId) {
          console.log("Course Id in if loop  " + this.courseIds[m])
          await this.getCourseNameById(this.courseIds[m]);


          totalStudsArr = this.courseProgressArr.filter((elem) => elem.courseId == this.courseIds[m])

          for (let i = 0; i < totalStudsArr.length; i++) {



            if (totalStudsArr[i].progress >= 0 && totalStudsArr[i].progress <= 25) { cnt1++; }
            else if (totalStudsArr[i].progress >= 26 && totalStudsArr[i].progress <= 50) { cnt2++; }
            else if (totalStudsArr[i].progress >= 51 && totalStudsArr[i].progress <= 75) { cnt3++; }
            else if (totalStudsArr[i].progress >= 76 && totalStudsArr[i].progress <= 100) { cnt4++; }


          }

          // }




          // }
          if (totalStudsArr.length == 0) {
            this.barCharts[m] = [0, 0, 0, 0, this.course.courseName + '  [No students]', this.course.courseId];
          }
          else {
            // this.barCharts[m] =  [Math.round((cnt1*100)/totalStudsArr.length) , Math.round((cnt2*100)/totalStudsArr.length) , Math.round((cnt3*100)/totalStudsArr.length) , Math.round((cnt4*100)/totalStudsArr.length)  , this.course.courseName]
            this.barCharts[m] = [cnt1, cnt2, cnt3, cnt4, this.course.courseName + '  [' + totalStudsArr.length + ' students]', this.course.courseId]
            console.log(this.barCharts[m])
          }
        }
      }
    )
  }
  // --------------------------------------------------------------------------------------------------------


  getAllCourseIds() {
    return new Promise<void>((resolve, reject) => {
      this.assignCouServ.getAssignedCourseOfTeacher(this.teacherId).subscribe(
        (response) => {
          this.courses = response

          this.courses.forEach((course) => { this.courseIds.push(course.courseId) });
          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });

  }



  //code for next button on progress panel
  barNext() {

    this.currentIndex += 3;


  }

  //code for previous button on progress panel
  barPrevious() {

    this.currentIndex -= 3;

  }

  //code for next button on progress panel
  doughnutNext() {



    this.dchartcurrentIndex += 3;


  }

  //code for previous button on progress panel
  doughnutPrevious() {


    this.dchartcurrentIndex -= 3;

  }



  //code to display course by providing course id
  async getCourseNameById(courseId: number) {
    return new Promise<void>((resolve, reject) => {
      this.courseService.getCourseByCourseId(courseId).subscribe(
        (data) => {
          this.course = data;
          if (this.barClicked) {
            this.clickedCourse = data;
            console.log(this.clickedCourse.courseName)
          }

          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });
  }






  //navigates the user to a route called teachercourse and passes an id parameter
  RedirectToTeacherCourse() {
    this._route.navigate(['Course']);
  }

  //navigates the user to a route called teachermodule and passes id and userName parameters
  RedirectToModule() {
    this._route.navigate(['Module', { id: this.teacherId }, this.userName]);
  }

  //navigates the user to a route called quiz and passes the userName parameter
  RedirectToQuiz() {

    this._route.navigate(['Quiz', this.userName]);
  }

  //navigates the user to a route called authenticationlogin
  RedirectTOLogin() {
    sessionStorage.removeItem('')
    sessionStorage.removeItem('profileId');
    sessionStorage.removeItem('userId');
    this._route.navigate(['authenticationlogin'])
  }

  //navigates the user to a route called announcement/teacher and passes an id parameter
  redirectToAnnouncements() {
    this._route.navigate(['announcement/teacher', { id: this.teacherId }])
  }

  //navigates the user to a route called Question
  RedirectToQuestion() {
    this._route.navigate(['Question', this.userName])
  }

  RedirectToModuleFile() {
    this._route.navigate(['modulefile'])
  }
  RedirectToEnrollStudent() {

    this._route.navigate(['enrollstudent', this.userName])

  }

  RedirectToAdminDept() {
    this._route.navigate(['Department', this.userName]);
  }
}
