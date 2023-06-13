import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { Assignteacher } from 'app/assigncoursetoteacher/class/assignteacher';
import { AssigncourseteacherService } from 'app/assigncoursetoteacher/services/assigncourseteacher.service';
import { BarChartComponent } from 'app/charts/components/bar-chart/bar-chart.component';
import { ChartdataComponent } from 'app/charts/components/chartdata/chartdata.component';
import { PolarChartComponent } from 'app/charts/components/polar-chart/polar-chart.component';
import { CourseProgress } from 'app/courseProgress/class/courseprogress';
import { CourseProgressService } from 'app/courseProgress/services/course-progress.service';
import { Department } from 'app/department/class/department';
import { DepartmentService } from 'app/department/services/department.service';
import { AssignCourseToTeacherService } from 'app/displayAssignedCourseToTeacher/services/teacher-course.service';
import { Enrolltostudent } from 'app/enrollstudent/class/enrolltostudent';
import { EnrolltostudentService } from 'app/enrollstudent/service/enrolltostudent.service';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { Course } from 'app/teacher-course/class/course';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { ThumbYDirective } from 'ngx-scrollbar/lib/scrollbar/thumb/thumb.directive';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
@ViewChild(PolarChartComponent) pChart: any;
@ViewChild(ChartdataComponent) dChart: any;
@ViewChild(BarChartComponent) bChart: any;
// @ViewChild('appChartData', { static: false })
// appChartData!: ElementRef;
////////////variable declarations/////////////
institutions:AdminInstitution[] = [];
departments : Department[] = [];
courses : Course[] = [];
profiles : any[] = [];
profileForDept : Profile[] = [];
deptName : string = '';
profileIds: any[] = [];
filteredProfileIds : any[] = [];
uniqueProfiles :Profile[] = [] ;
deptArray :any[] = [];
deptNameArray :any[]= [];
instName:any
deptId : any ='';
instId :any ='';
courseNameArr:any[]= [];
profilesLenghtArray:any[] = [];
filteredProfiles:any[]=[];
instChartStat : boolean = false;
courChartStat : boolean = false;
profChartStat : boolean = false;
deptClicked : any ='';
clickedCourse :any[]=[];
profCategoryArr:any =[];
profCategoryNames:any =[];
studCntInCour :any =[];
teaCntInCour :any =[];
profileIdForStuTea :any[] =[];
courseProgressArr: CourseProgress[] = [];
courseIds: number[] = [];
barCharts: any = [];
course: Course = new Course();
currentIndex: number = 0;
barClicked :boolean = false;
studIdsArr :any[] =[];
teacIdsArr :any[] =[];
deptNameCouCnt:string[] =[];
teacherId : number[] =[];
studProgDetailArr:any = [];
closeButtonStatus : boolean = true;
coursesInInst :Course[] = []; 
clickedCourseOnBar:Course =new Course();
dchartcurrentIndex : number =0;
popupDataValue: any;
popupDataLabel: any;
teachersInINst : Profile[]= [];
studentsInINst : Profile[]= [];
////////////variable declarations end////////

constructor(  private instServ: AdmininstitutionService , private deptServ: DepartmentService,
   private courseServ : TeacherCourseService, private enrollStuServ : EnrolltostudentService,
   private assignCourseServ : AssigncourseteacherService , private profileServ : ProfileService,
   private courseProgServ: CourseProgressService,private assignCouServ :AssignCourseToTeacherService){}
  
 ngAfterViewInit(){
 
    // const appChartDataWidth = this.appChartData.nativeElement.offsetWidth;
    // const horizontalElement = this.bChart.nativeElement.querySelector('.horizontal');
    // horizontalElement.style.width = appChartDataWidth + 'px';

}

ngOnInit(){
  //var for inst chart ui
  this.instChartStat = false;
  this.getAllInstitutions()
  this.clickedCourseOnBar.courseName = '';

}

getAllInstitutions()
{
  this.instServ.fetchAdminInstitutionList().subscribe(
    (response)=>{

      this.institutions = response;
      console.log(this.institutions)

    }
  )
}


getDepartmentsByInstId(instId: number) {
  this.instName = '';
  let filteredInstitution :AdminInstitution[] = [];
  filteredInstitution = this.institutions.filter((elem)=>elem.adminInstitutionId == instId);

  this.instName = filteredInstitution[0].adminInstitutionName;


  return new Promise((resolve, reject) => {
    this.departments = [];
    this.deptServ.getDepartmentsByInstitutionId(instId).subscribe(
      (response) => {
        this.departments = response;
        console.log("departments array in func", this.departments);
        resolve(this.departments); // Resolve the promise with the departments
      },
      (error) => {
        reject(error); // Reject the promise with the error
      }
    );
  });
}


getCoursesByDeptId(deptId : number){

return new Promise((resolve, reject) => {
 this.courses=[];
  this.courseServ.getCourseByDepartmentId(deptId).subscribe(
    (response) =>{
      this.courses = response;
      console.log("courses array in func", this.courses);
      resolve(this.courses)
    }
    ,
    (error) => {
      reject(error); // Reject the promise with the error
    }

  );
  });
}

getProfileByInstitutionId(instId : number,deptName:string)
{  this.deptName = deptName;
  this.profileServ.getAllProfiles().subscribe(
    (response) => {
      
      this.profileForDept = response.filter((elem)=>(elem.institutionId == instId) && (elem.activeUser == true) && ((elem.userRole == 'teacher') || (elem.userRole == 'student')))
  
    }
  )
}


// getProfileByProfileId(profileId : number)
// {
//   this.filteredProfiles =[];
//   let uniqueIds :number[] = []


//   console.log("profiles array before api calling")
//   console.log(this.profiles)   

//  return new Promise((resolve, reject) => {
//    this.profileServ.getProfileByAdminId(profileId).subscribe(
//     (response)=>{
//       let  profile : Profile = new Profile();
//       profile = response
       
//       console.log(profile)

//       this.profiles.push(profile)
  
// //  for(let i=0; i<=this.profiles.length;i++){
// //   for(let j=0; j<=this.uniqueProfiles.length;j++)
// //   {
// //        if(this.uniqueProfiles[j].adminId != this.profiles[i].adminId)
// //         {
// //            this.uniqueProfiles.push(this.profiles[i])
// //         }
// //   }
// // }

// // this.profiles = this.uniqueProfiles;

// console.log("Profiles in getProfileByProfileId")   
// console.log(this.profiles)   

// this.getProfileByInstitutionId(this.instId,'');
// for(let  profile of this.profiles)
// {
//   for(let  instProf of this.profileForDept){
//     if(profile.institutionId == instProf.institutionId)
//     {
//       this.filteredProfiles.push(this.profileForDept)
//     }
//   }
 
// }

// this.profiles = this.filteredProfiles;
// this.profiles = this.getUniqueProfilesByAdminId(this.profiles);
// resolve(this.profiles)
//     } 
//     , (error) => {
//       reject(error); // Reject the promise with the error
//     }
//    )
//   });


//   console.log("Profiles after filtering")
//   console.log(this.profiles)
 
  
// }

getProfileByProfileId(profileId: number) {
  this.filteredProfiles = [];
  let uniqueIds: number[] = [];

  console.log("Profiles array before API calling");
  console.log(this.profiles);

  return new Promise((resolve, reject) => {
    this.profileServ.getProfileByAdminId(profileId).subscribe(
      (response) => {
        let profile: Profile = response;

        console.log(profile);

        this.profiles.push(profile);

        console.log("Profiles in getProfileByProfileId");
        console.log(this.profiles);

        this.getProfileByInstitutionId(this.instId, '');

        console.log("profiles in department")
        console.log(this.profileForDept)
        for (let profile of this.profiles) {
          for (let instProf of this.profileForDept) {
            if (profile.institutionId == instProf.institutionId) {
              this.filteredProfiles.push(profile);
            }
          }
        }

        this.profiles = this.filteredProfiles;
        this.profiles = this.getUniqueProfilesByAdminId(this.profiles);

        console.log("profiles after loop")
        console.log(this.profiles)
        resolve(this.profiles);
      },
      (error) => {
        reject(error); // Reject the promise with the error
      }
    );
 
  });
}




getUniqueProfilesByAdminId(profiles: Profile[]): Profile[] {
  const uniqueProfiles: Profile[] = profiles.reduce((unique: Profile[], profile: Profile) => {
    if (!unique.some((p: Profile) => p.adminId === profile.adminId)) {
      unique.push(profile);
    }
    return unique;
  }, []);

  return uniqueProfiles;
}
//working code

// getProfilesInCourse(courseId: number) {
//   console.log(courseId);
//   this.profiles = [];

//   this.profileIds = [];
//   this.filteredProfileIds = [];
//   return new Promise((resolve, reject) => {
  
//   this.enrollStuServ.getStudentByCourseId(courseId).subscribe(
//     (response) => {

//       console.log("resoppnse in enrollstostudent")
//       console.log(response)
//       response.forEach((data: Enrolltostudent) => {
//         this.profileIds.push(data.profileId);
//         console.log("profile Ids getProfilesInCourse")
//         console.log(this.profileIds );
//         resolve(this.profileIds)
//       })
//       for (let profId of this.profileIds) {
//         this.getProfileByProfileId(profId);
//       }
//     }
//     ,(error) => {
//       reject(error); // Reject the promise with the error
//     }
//   );
//   });

//   return new Promise((resolve, reject) => {
  

//   this.assignCourseServ.getTeacherByCourseId(courseId).subscribe(
//     (response) => {
//       console.log("resoppnse in AssignTeacher")
//       console.log(response)
//       response.forEach((data: Assignteacher) => {
//         this.profileIds.push(data.profileId);
//         console.log("profile Ids getProfilesInCourse")
//         console.log(this.profileIds );
//         resolve(this.profileIds)
//       })
      
//       for (let profId of this.profileIds) {
//         this.getProfileByProfileId(profId);
//       }
//     }
//     ,(error) => {
//       reject(error); // Reject the promise with the error
//     }
//   );
//   });

// }


// async getAllDeptDetails(instId:number){

// this.deptArray = [];
// let courseLenArr : number[]=[];
// console.log("getAllDeptDetails(instId:number) called")
// console.log(instId)
// await this.getDepartmentsByInstId(instId);
// console.log("Departments lenght"+this.departments.length)
// for(let dept of this.departments)
// {


//   this.deptArray.length == this.departments.length;

//   await  this.getCoursesByDeptId(dept.id)
  

//    console.log("Courses array lenght"+this.courses.length)
//    courseLenArr.push(this.courses.length);
    
// }

// this.deptArray = courseLenArr;
// console.log(this.deptArray )
// }
//working code

// async getProfilesInCourse(courseId: number) {
//   console.log(courseId);
//   this.profiles = [];
//   let profile:any;
//   this.profileIds = [];
//   this.filteredProfileIds = [];

//   console.log("New call given")
//   console.log(this.profiles.length)
//   // Get students by course ID
//   const studentProfiles = await new Promise<any[]>((resolve, reject) => {
//     this.enrollStuServ.getStudentByCourseId(courseId).subscribe(
//       (response) => {
//         const profiles = response.map((data: Enrolltostudent) => data.profileId);
//         console.log("Profiles in enroll")
//         console.log(profiles)
//         resolve(profiles);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });

//   // Get teachers by course ID
//   const teacherProfiles = await new Promise<any[]>((resolve, reject) => {
//     this.assignCourseServ.getTeacherByCourseId(courseId).subscribe(
//       (response) => {
//         const profiles = response.map((data: Assignteacher) => data.profileId);
//         resolve(profiles);
//         console.log("Profiles in teacher")
//         console.log(profiles)
        
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });

//   this.studCntInCour = studentProfiles.length;
//   this.teaCntInCour = teacherProfiles.length;

//   console.log("")
//   // Merge student and teacher profiles
//   const profileIds = [...studentProfiles, ...teacherProfiles];



//   console.log(profileIds)
//   for (let profileId of profileIds) {
   
//      await this.getProfileByProfileId(profileId);
//     // this.profiles.push(profile);
//   }

//   console.log("Profiles in course:");

//   console.log(this.profiles)
// }

async getProfilesInCourse(instId:number,courseId: number) {
  console.log(courseId);
  this.profiles = [];
  let profile:any;
  this.profileIds = [];
  this.filteredProfileIds = [];
  this.profileIdForStuTea = [];


  console.log("New call given")
  console.log(this.profiles.length)
  // Get students by course ID
  const studentProfiles = await new Promise<any[]>((resolve, reject) => {
    this.enrollStuServ.getProfileByInstIdCourId(instId,courseId).subscribe(
      (response) => {
        const profiles = response.map((data: Enrolltostudent) => data.profileId);
        console.log("Profiles in enroll")
        console.log(profiles)
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });

  // Get teachers by course ID
  const teacherProfiles = await new Promise<any[]>((resolve, reject) => {
    this.assignCourseServ.getProfileByInstIdCourId(instId,courseId).subscribe(
      (response) => {
        // const profiles = response.map((data: Assignteacher) => data.profileId);
        resolve(response);
        console.log("Profiles in teacher")
        console.log(response)
        
      },
      (error) => {
        reject(error);
      }
    );
  });

  this.studIdsArr = studentProfiles;
  this.teacIdsArr = teacherProfiles;
  this.studCntInCour = studentProfiles.length;
  this.teaCntInCour = teacherProfiles.length;

  console.log("")
  // Merge student and teacher profiles
  const profileIds = [...studentProfiles, ...teacherProfiles];
 
  this.profileIdForStuTea = profileIds


  console.log(profileIds)

  
  // for (let profileId of profileIds) {
   
  //    await this.getProfileByProfileId(profileId);
  //   // this.profiles.push(profile);
  // }

  // console.log("Profiles in course:");

  // console.log(this.profiles)
}


async getAllDeptDetails(instId: number) {
  this.instChartStat = true;
  this.deptArray = [];
 this.deptId = ''; 
  let courseLenArr: number[] = [];
 this.deptNameArray = [];
 this.instId = instId;
 this.profilesLenghtArray = [];
 this.barCharts = [];
 this.deptNameCouCnt = [];
 this.studProgDetailArr = [];
  console.log("getAllDeptDetails(instId:number) called");
  console.log(instId);
  await this.getDepartmentsByInstId(instId);
  console.log("Departments length: " + this.departments.length);
  for (let dept of this.departments) {
    console.log("Entered in for loop")
    this.deptArray.length == this.departments.length;

    await this.getCoursesByDeptId(dept.id);
    console.log("Courses array length: " + this.courses.length);
    courseLenArr.push(this.courses.length);
    this.deptNameArray.push(dept.name);
  this.deptNameCouCnt.push(dept.name +" - "+this.courses.length);
  }
  this.deptArray[0] = courseLenArr;
  // this.deptArray[1] = this.deptNameArray;
  // this.deptArray[1] = deptNameArray;
  
  console.log(this.deptArray);
}


getClickedDataForDept(data:  string, instId: number) {
  // this.dchartcurrentIndex = 0;
  // this.barClicked = true;
  this.profilesLenghtArray =[];
 let profLen :number[]= []
 this.courChartStat = true;
  this.courseNameArr = [];
  let clickedDepartment :Department[] = [];
  this.deptClicked = '';
  this.barCharts =[];
  this.studProgDetailArr =[];
  var valueBeforeHyphen = data.split(" - ")[0];
  // console.log(this.barClicked)
  // let courseProgressArr: CourseProgress[] = [];
  // let filteredCourseProgressArr: CourseProgress[] = [];
  console.log("Function called")
  // Perform actions with the data
  console.log('Received right-click data:', valueBeforeHyphen);

  // this.popupDataValue = data.value;
  this.deptClicked = valueBeforeHyphen;
  // console.log('Received right-click data:', data.value, data.label);
  console.log()

  this.deptServ.getDepartmentsByInstitutionId(instId).subscribe(
    async (response)=>{
      clickedDepartment =  response.filter((elem)=>elem.name == valueBeforeHyphen);

     await this.getCoursesByDeptId(clickedDepartment[0].id);
      console.log("Courses in clicked funtcion")
     console.log(this.courses)
      for(let cour of this.courses )
      {
      await this.getProfilesInCourse(instId,cour.courseId)

      console.log("Profiles in course")
      console.log(this.profiles)

      console.log("Profiles in course")
      console.log(this.profileIdForStuTea)
      console.log("Profiles Array lenght"+this.profileIdForStuTea.length) 

       profLen.push(this.profileIdForStuTea.length);
    

       this.courseNameArr.push(cour.courseName)

       console.log(this.profilesLenghtArray)
       console.log(this.courseNameArr)
      }
      this.profilesLenghtArray.push(profLen)
    }
  )

//   const rangeArray = this.popupDataLabel.split("-"); // Split the string into an array of two elements

//   const startValue = parseInt(rangeArray[0]); // Parse the first element as an integer
//   const endValue = parseInt(rangeArray[1]); // Parse the second element as an integer

//  await this.getCourseNameById(courseId);



//   console.log(startValue); // Output: 26
//   console.log(endValue); // Output: 75
//   // console.log( parseInt(this.popupDataLabel))
//   this.courseProgServ.getAllCourseProgress().subscribe(
//     (data) => {
//       console.log(startValue); // Output: 26
//       console.log(endValue); // Output: 75
//       courseProgressArr = data;
//       filteredCourseProgressArr = courseProgressArr.filter((elem) => elem.courseId == courseId && ((elem.progress >= startValue) && (elem.progress <= endValue)))

//       console.log(filteredCourseProgressArr)
//       this.courseProgressArr = filteredCourseProgressArr

//     }
//   ),
//     (error: any) => { error }
//   this.getStudentNamesandCourProgress();
// }
}


 getClickedData(data: { value: any; label: string }, instId: number) {
    // this.dchartcurrentIndex = 0;
    // this.barClicked = true;
    this.profilesLenghtArray =[];
   let profLen :number[]= []
   this.courChartStat = true;
    this.courseNameArr = [];
    let clickedDepartment :Department[] = [];
    this.deptClicked = '';
    this.studProgDetailArr = [];
    // console.log(this.barClicked)
    // let courseProgressArr: CourseProgress[] = [];
    // let filteredCourseProgressArr: CourseProgress[] = [];
    console.log("Function called")
    // Perform actions with the data
    console.log('Received right-click data:', data);

    // this.popupDataValue = data.value;
    this.deptClicked = data.label;
    console.log('Received right-click data:', data.value, data.label);
    console.log()

    this.deptServ.getDepartmentsByInstitutionId(instId).subscribe(
      async (response)=>{
        clickedDepartment =  response.filter((elem)=>elem.name == data.label);

       await this.getCoursesByDeptId(clickedDepartment[0].id);
        console.log("Courses in clicked funtcion")
       console.log(this.courses)
        for(let cour of this.courses )
        {
        await this.getProfilesInCourse(instId,cour.courseId)

        console.log("Profiles in course")
        console.log(this.profiles)

        console.log("Profiles in course")
        console.log(this.profileIdForStuTea)
        console.log("Profiles Array lenght"+this.profileIdForStuTea.length) 

         profLen.push(this.profileIdForStuTea.length);
      

         this.courseNameArr.push(cour.courseName)

         console.log(this.profilesLenghtArray)
         console.log(this.courseNameArr)
        }
        this.profilesLenghtArray.push(profLen)
      }
    )

  //   const rangeArray = this.popupDataLabel.split("-"); // Split the string into an array of two elements

  //   const startValue = parseInt(rangeArray[0]); // Parse the first element as an integer
  //   const endValue = parseInt(rangeArray[1]); // Parse the second element as an integer

  //  await this.getCourseNameById(courseId);



  //   console.log(startValue); // Output: 26
  //   console.log(endValue); // Output: 75
  //   // console.log( parseInt(this.popupDataLabel))
  //   this.courseProgServ.getAllCourseProgress().subscribe(
  //     (data) => {
  //       console.log(startValue); // Output: 26
  //       console.log(endValue); // Output: 75
  //       courseProgressArr = data;
  //       filteredCourseProgressArr = courseProgressArr.filter((elem) => elem.courseId == courseId && ((elem.progress >= startValue) && (elem.progress <= endValue)))

  //       console.log(filteredCourseProgressArr)
  //       this.courseProgressArr = filteredCourseProgressArr

  //     }
  //   ),
  //     (error: any) => { error }
  //   this.getStudentNamesandCourProgress();
  // }
}

getProfilesCntByRoleAndInstId(role:string,instId:number)
{
  this.profileServ.getProfileByRoleAndInstitutionId(role,instId).subscribe(
    (response) => {
 
      if(role == 'teacher')
      {
        this.teachersInINst= response;
      }
      else if(role == 'student')
      {
        this.studentsInINst = response;
      }

    }
  )
  
}



getCourseByNameandINstId(courName:string,instId:any)
{

  return new Promise((resolve, reject) => {
  this.courseServ.getCourseByInstitutionId(instId).subscribe(
    (response)=>{
     this.coursesInInst = response;
     this.clickedCourse = response.filter((elem:Course)=>elem.courseName == courName)
     resolve(this.clickedCourse)
    },
    
      (error) => {
        reject(error); // Reject the promise with the error
      }
  )
    });
}

  async getClickedCourseData(data: { value: any; label: string },instId:number) {
    
  this.profChartStat = true;
  this.profCategoryArr =[];
  this.profCategoryNames =["students","teachers"];
  this.studProgDetailArr = [];
  console.log('Received right-click data:', data);
 
  // this.popupDataValue = data.value;
  
  console.log('Received right-click data:', data.value, data.label);

  await this.getCourseByNameandINstId(data.label,instId);

  this.getProfilesInCourse(instId,this.clickedCourse[0].courseId)
  
  this.studCntInCour;
  console.log("this.teaCntInCour")
 console.log( this.teacIdsArr);


 console.log("this.studIdsArr")
 console.log( this.studIdsArr);

  console.log(this.studCntInCour)
  console.log(this.teaCntInCour)

  this.profCategoryArr[0] = [this.studCntInCour,this.teaCntInCour];
  // this.profCategoryArr.push(this.teaCntInCour);


  // console.log(teacId)
  this.courseProgServ.getAllCourseProgress().subscribe(
    async (response) => {
      this.courseProgressArr = response;

      // await this.getAllCourseIds(teacId);

      console.log(this.courseIds);
      // for (let m = 0; m < this.courseIds.length; m++) {
        let courseName: String = ' ';
        let cnt1 = 0;
        let cnt2 = 0;
        let cnt3 = 0;
        let cnt4 = 0;
        let totalStudsArr: CourseProgress[] = [];


        // filteredCouProgArr = this.courseProgressArr.filter((element)=>element.courseId == this.courseIds[i]))
        //  for(let i=0; i<this.courseProgressArr.length; i++){

        //  if(this.courseIds[m] == this.courseProgressArr[i].courseId) {
        console.log("Course Id in if loop  " + this.clickedCourse[0].courseId)
        await this.getCourseNameById(this.clickedCourse[0].courseId);
        

        totalStudsArr = this.courseProgressArr.filter((elem) => elem.courseId == this.clickedCourse[0].courseId)
        
        for (let i = 0; i < totalStudsArr.length; i++) {



          if (totalStudsArr[i].progress >= 0 && totalStudsArr[i].progress <= 25) { cnt1++; }
          else if (totalStudsArr[i].progress >= 26 && totalStudsArr[i].progress <= 50) { cnt2++; }
          else if (totalStudsArr[i].progress >= 51 && totalStudsArr[i].progress <= 75) { cnt3++; }
          else if (totalStudsArr[i].progress >= 76 && totalStudsArr[i].progress <= 100) { cnt4++; }


        }

        // }




        // }
        if (totalStudsArr.length == 0) {
          this.barCharts[0] = [0, 0, 0, 0, this.course.courseName + '  [No students]', this.course.courseId];
        }
        else {
          // this.barCharts[m] =  [Math.round((cnt1*100)/totalStudsArr.length) , Math.round((cnt2*100)/totalStudsArr.length) , Math.round((cnt3*100)/totalStudsArr.length) , Math.round((cnt4*100)/totalStudsArr.length)  , this.course.courseName]
          this.barCharts[0] = [cnt1, cnt2, cnt3, cnt4, this.course.courseName + '  [' + totalStudsArr.length + ' students]', this.course.courseId]
          console.log(this.barCharts[0])
        }
      // }
    }
  )

}





////CODE FOR STUDENT PROGRESS//////////////

//fnction to get all data for course progress 
async getAllCourseProgress(teacId :number) {

  console.log(teacId)
  this.courseProgServ.getAllCourseProgress().subscribe(
    async (response) => {
      this.courseProgressArr = response;

      // await this.getAllCourseIds(teacId);

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

getAllCourseIds(teacId:number) {
  return new Promise<void>((resolve, reject) => {

    // for(let id of teacherIDs)
    // {
    this.assignCouServ.getAssignedCourseOfTeacher(teacId).subscribe(
      (response) => {
        this.courses = response

        this.courses.forEach((course) => { this.courseIds.push(course.courseId) });
        resolve();
      },
      (error) => {
        reject(error);
      }
    )
    // }
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

  //code to display course by providing course id
  async getCourseNameById(courseId: number) {
    return new Promise<void>((resolve, reject) => {
      this.courseServ.getCourseByCourseId(courseId).subscribe(
        (data) => {
          this.course = data;
          if(this.barClicked)
          {
          this.clickedCourseOnBar = data;
          console.log( this.clickedCourseOnBar.courseName )
          }
   
          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });
  }


 // --------------------------------------------------------------------------------------------------------

  //fnction to get all data for course progress 
  async getStuCourseProgress(teachId:number) {

    this.courseProgServ.getAllCourseProgress().subscribe(
      async (response) => {
        this.courseProgressArr = response;

        await this.getAllCourseIds(teachId );

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


  //-------------------------------------------------------------------
  displayPopupStyle = "none";
 



  async  handleRightClickDataForBar(data: { value: any; label: any }, courseId: number) {
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

   this.assignCourseServ.getTeacherByCourseId(courseId).subscribe(
    (response)=>{

      this.teacherId = response;

    }
   )

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

  //-------------------------------------------------------------------
  getStudentNamesandCourProgress() {
    this.closeButtonStatus  = false;
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
          this.studProgDetailArr.push([ this.courseProgressArr[i].progress, remainingPercentage , profile.firstName + ' ' + profile.lastName]);

          // Check if all the data has been retrieved

        }
      );

    }
    console.log(this.studProgDetailArr);
  }


  closeButton()
  {
   this.closeButtonStatus = true;
   this.clickedCourseOnBar.courseName = '';
   this.barClicked = false;

  }

    //code for next button on progress panel
    doughnutNext() {


      
      this.dchartcurrentIndex +=3;
      console.log("this.dchartcurrentIndex value     "+this.dchartcurrentIndex)
  
    }
  
    //code for previous button on progress panel
    doughnutPrevious() {
  
     
      this.dchartcurrentIndex -=3;
     
    }
  

  // --------------------------------------------------------------------------------------------------------


  

}
