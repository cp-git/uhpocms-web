import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dataOne from '../../../dataOne.json';
import * as dataThree from '../../../dataThree.json';

import { ChartdataComponent } from 'app/student-module/components/chartdata/chartdata.component';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Course } from 'app/teacher-course/class/course';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent {
  arrOne: any = dataOne.data[0];
  arrTwo: any = dataOne.data[0];
  arrThree: any = dataThree.data[0];

  course:Course= new Course();
  @ViewChild(ChartdataComponent) dChart: any;

  
  doughCharts:any=[];
  criteriaVar:number=0;
  numOfChartsDisplayed:number=0;
  currentIndex: number = 0;
  doughnutCharts: { category: string, numbers: number[], labels: string[], colors: string[] }[] = 

  [
    {
        "category": "Advertising",//course id //dynamic
        "numbers": [5,15,30,35,15],
        "labels": ["Google", "Facebook", "Instagram", "Amazon", "YouTube"], //Complete and Incomplte //static
        "colors": ["#E15D44", "#55B4B0", "#DFCFBE", "#9B2335", "#5B5EA6"]  //any two colours
    },
//  [
//   [
  {
    category: "",
    numbers: []
    ,
    labels: [],
    colors: []
  },
  {
    category: "",
    numbers: []
    ,
    labels: [],
    colors: []
  },
];   

  
  
  
  
  

  // Declare class properties
  profileId: any;
  courseProgressArr: CourseProgress[] = [];
  userName!: string;

  // Inject Router and ActivatedRoute services into constructor
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute,private courseProgServ:CourseProgressService,private courseService:TeacherCourseService) {

  }


  // Initialize component properties with current route parameters
  ngOnInit(): void {
    this.profileId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.profileId);
    this.getAllCourseProgress();
    this.loadMoreCharts();
    
    console.log(this.currentIndex)
    // this.showNextButton();
  }

  
    async getAllCourseProgress(){
      let filteredCouProgArr:CourseProgress[]=[];
  this.courseProgServ.getAllCourseProgress().subscribe(
    async (response)=>{
      this.courseProgressArr = response;

      filteredCouProgArr = this.courseProgressArr.filter((element)=>element.studentId == this.profileId);
       for(let i=0; i<filteredCouProgArr.length; i++){
        const remainingPercentage:number = 100-filteredCouProgArr[i].progress;
        // this.doughnutCharts[i].numbers= [0, 0];
        // this.doughnutCharts[i].numbers= [this.courseProgressArr[i].progress, remainingPercentage];
        // this.doughnutCharts[i].category = (this.courseProgressArr[i].courseId).toString();

        await this.getCourseNameById(filteredCouProgArr[i].courseId);

        this.doughCharts[i] = [filteredCouProgArr[i].progress, remainingPercentage, this.course.courseName];
      }

      console.log(this.doughCharts)
      this.criteriaVar = this.doughCharts.length - 3;
      console.log(Array.isArray(this.doughnutCharts))
    }
  )
}
loadMoreCharts() {
  this.numOfChartsDisplayed += 3;
}
next() {
  // if (this.currentIndex < this.doughCharts.length - 4) {
    this.currentIndex += 3;
    this.getAllCourseProgress();
    console.log(this.currentIndex)
  // }
}

previous() {

  this.currentIndex -= 3;
  this.getAllCourseProgress();
}

showNextButton() {
  return this.currentIndex < this.doughCharts.length - 3;
}
getCourseNameById(courseId:number){
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
