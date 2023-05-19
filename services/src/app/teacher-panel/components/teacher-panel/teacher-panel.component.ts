import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { AssignCourseToTeacherService } from 'app/displayAssignedCourseToTeacher/services/teacher-course.service';
import { BarChartComponent } from 'app/student-module/components/bar-chart/bar-chart.component';
import { ChartdataComponent } from 'app/student-module/components/chartdata/chartdata.component';
import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';

@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.css']
})
export class TeacherPanelComponent {

  course:Course= new Course();
  @ViewChild(BarChartComponent) dChart: any;
  //doughnut chart data array
  doughCharts:any=[];
  criteriaVar:number=0;

  currentIndex: number = 0;
 
  courses:Course[]=[];
  courseIds : number[]= [];
  courseProgressArr: CourseProgress[] = [];
  teacherId: any;
  userName!: string;
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute,private courseProgServ:CourseProgressService,private courseService:TeacherCourseService, private assignCouServ: AssignCourseToTeacherService) {

  }

  ngOnInit(): void {
    this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.teacherId)
    this._route.navigate(['../'], { relativeTo: this._activatedRoute });
    this.getAllCourseProgress();


  }

//fnction to get all data for course progress 
// async getAllCourseProgress(){

//   this.courseProgServ.getAllCourseProgress().subscribe(
//   async (response)=>{
//     this.courseProgressArr = response;

//     await this.getAllCourseIds();

//     console.log(this.courseIds);
//    for(let m=0; m<this.courseIds.length;m++) {
//     let courseName:String ;
//     let cnt1=0;
//     let cnt2=0;
//     let cnt3=0;
//     let cnt4=0;
//     let totalStudsArr:CourseProgress[]=[];
    
    
//     // filteredCouProgArr = this.courseProgressArr.filter((element)=>element.courseId == this.courseIds[i]))
//      for(let i=0; i<this.courseProgressArr.length; i++){
      
//      if(this.courseIds[m] == this.courseProgressArr[i].courseId) {
//       console.log("Course Id in if loop  "+this.courseIds[m] )
//       await this.getCourseNameById(this.courseProgressArr[i].courseId);

//       totalStudsArr = this.courseProgressArr.filter((elem)=> elem.courseId == this.courseProgressArr[i].courseId)
     




//       if(this.courseProgressArr[i].progress >= 0 && this.courseProgressArr[i].progress <= 25)
//       {cnt1++;}
//       else if(this.courseProgressArr[i].progress >= 26 && this.courseProgressArr[i].progress <= 50)
//       {cnt2++;}
//       else if(this.courseProgressArr[i].progress >= 51 && this.courseProgressArr[i].progress <= 75)
//       {cnt3++;}
//       else if(this.courseProgressArr[i].progress >= 76 && this.courseProgressArr[i].progress <= 100)
//       {cnt4++;}

     

      
//     }

   
   
    
//   }

//   this.doughCharts[m] =  [Math.round((cnt1*100)/totalStudsArr.length) , Math.round((cnt2*100)/totalStudsArr.length) , Math.round((cnt3*100)/totalStudsArr.length) , Math.round((cnt4*100)/totalStudsArr.length)  , this.course.courseName]
//   console.log( this.doughCharts[m] )
// }
// }
// )
// }




// --------------------------------------------------------------------------------------------------------

//fnction to get all data for course progress 
async getAllCourseProgress(){

  this.courseProgServ.getAllCourseProgress().subscribe(
  async (response)=>{
    this.courseProgressArr = response;

    await this.getAllCourseIds();

    console.log(this.courseIds);
   for(let m=0; m<this.courseIds.length;m++) {
    let courseName:String = ' ';
    let cnt1=0;
    let cnt2=0;
    let cnt3=0;
    let cnt4=0;
    let totalStudsArr:CourseProgress[]=[];
    
    
    // filteredCouProgArr = this.courseProgressArr.filter((element)=>element.courseId == this.courseIds[i]))
    //  for(let i=0; i<this.courseProgressArr.length; i++){
      
    //  if(this.courseIds[m] == this.courseProgressArr[i].courseId) {
      console.log("Course Id in if loop  "+this.courseIds[m] )
      await this.getCourseNameById(this.courseIds[m]);

      totalStudsArr = this.courseProgressArr.filter((elem)=> elem.courseId == this.courseIds[m])
     
    for(let i=0;i<totalStudsArr.length;i++)
    {



      if(totalStudsArr[i].progress >= 0 && totalStudsArr[i].progress <= 25)
      {cnt1++;}
      else if(totalStudsArr[i].progress >= 26 && totalStudsArr[i].progress <= 50)
      {cnt2++;}
      else if(totalStudsArr[i].progress >= 51 && totalStudsArr[i].progress <= 75)
      {cnt3++;}
      else if(totalStudsArr[i].progress >= 76 && totalStudsArr[i].progress <= 100)
      {cnt4++;}

     
    }
      
    // }

   
   
    
  // }
  if(totalStudsArr.length == 0)
  {
    this.doughCharts[m] = [0,0,0,0, this.course.courseName]
  }
  else{
  this.doughCharts[m] =  [Math.round((cnt1*100)/totalStudsArr.length) , Math.round((cnt2*100)/totalStudsArr.length) , Math.round((cnt3*100)/totalStudsArr.length) , Math.round((cnt4*100)/totalStudsArr.length)  , this.course.courseName]
  console.log( this.doughCharts[m] )
  }
}
}
)
}
// --------------------------------------------------------------------------------------------------------


getAllCourseIds()
{
  return new Promise<void>((resolve,reject)=>{
  this.assignCouServ.getAssignedCourseOfTeacher(this.teacherId).subscribe(
    (response)=>{
      this.courses = response

     this.courses.forEach((course)=>{this.courseIds.push(course.courseId)});
      resolve();
    },
    (error)=>{
      reject(error);
    }
  )
});

}



//code for next button on progress panel
next() {

  this.currentIndex += 3;
  // this.getAllCourseProgress();
 
}

//code for previous button on progress panel
previous() {

this.currentIndex -= 3;
// this.getAllCourseProgress();
}

//code to display course by providing course id
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
}
