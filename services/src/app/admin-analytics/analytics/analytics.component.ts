import { Location } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { DisplayinstituteComponent } from 'app/admin-institution/components/displayinstitute/displayinstitute.component';
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
import { environment } from 'environments/environment.development';
import { ThumbYDirective } from 'ngx-scrollbar/lib/scrollbar/thumb/thumb.directive';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {





  ////////////variable declarations/////////////
  admininstitutions: AdminInstitution[] = [];
  @ViewChild(PolarChartComponent) pChart: any;
  @ViewChild(ChartdataComponent) dChart: any;
  @ViewChild(BarChartComponent) bChart: any;
  institutions: AdminInstitution[] = [];
  departments: Department[] = [];
  courses: Course[] = [];
  profiles: any[] = [];
  profileForDept: Profile[] = [];
  deptName: string = '';
  profileIds: any[] = [];
  filteredProfileIds: any[] = [];
  uniqueProfiles: Profile[] = [];
  deptArray: any[] = [];
  deptNameArray: any[] = [];
  instName: any
  deptId: any = '';
  instId: any = '';
  courseNameArr: any[] = [];
  profilesLenghtArray: any[] = [];
  filteredProfiles: any[] = [];
  instChartStat: boolean = false;
  courChartStat: boolean = false;
  profChartStat: boolean = false;
  deptClicked: any = '';
  clickedCourse: any[] = [];
  profCategoryArr: any = [];
  profCategoryNames: any = [];
  studCntInCour: any = [];
  teaCntInCour: any = [];
  profileIdForStuTea: any[] = [];
  courseProgressArr: CourseProgress[] = [];
  courseIds: number[] = [];
  barCharts: any = [];
  course: Course = new Course();
  currentIndex: number = 0;
  barClicked: boolean = false;
  studIdsArr: any[] = [];
  teacIdsArr: any[] = [];
  deptNameCouCnt: string[] = [];
  teacherId: number[] = [];
  studProgDetailArr: any = [];
  closeButtonStatus: boolean = true;
  coursesInInst: Course[] = [];
  clickedCourseOnBar: Course = new Course();
  dchartcurrentIndex: number = 0;
  popupDataValue: any;
  popupDataLabel: any;
  teachersInINst: Profile[] = [];
  studentsInINst: Profile[] = [];
  backupInst: AdminInstitution[] = [];
  isHidden: boolean = false;
  admininstitution: AdminInstitution;
  private readonly institutionUrl!: string;
  displayUrl: any;
  selectedImageId: number | null = null;
  lastClickTime = 0;
  displayPopupStyle = "none";
  ////////////variable declarations end////////

  constructor(private instServ: AdmininstitutionService, private deptServ: DepartmentService,
    private courseServ: TeacherCourseService, private enrollStuServ: EnrolltostudentService,
    private assignCourseServ: AssigncourseteacherService, private profileServ: ProfileService,
    private courseProgServ: CourseProgressService, private assignCouServ: AssignCourseToTeacherService, private location: Location) {
    this.admininstitution = new AdminInstitution();
    this.institutionUrl = `${environment.adminInstitutionUrl}/institution`;
  }


  ngOnInit() {

    this.instChartStat = false;
    this.getAllInstitutionImages()
    this.getAllInstitutions()
    this.displayUrl = this.institutionUrl + '/getFileById'
    this.clickedCourseOnBar.courseName = '';

  }

  //function for back button
  back() {
    this.location.back();
  }


  getAllInstitutions() {
    this.instServ.fetchAdminInstitutionList().subscribe(
      (response) => {

        this.institutions = response;
        console.log(this.institutions)

      }
    )
  }

  getDepartmentsByInstId(instId: number) {
    this.instName = '';
    let filteredInstitution: AdminInstitution[] = [];
    //filtered institution as per institution id
    filteredInstitution = this.institutions.filter((elem) => elem.adminInstitutionId == instId);

    this.instName = filteredInstitution[0].adminInstitutionName;


    return new Promise((resolve, reject) => {
      this.departments = [];
      this.deptServ.getDepartmentsByInstitutionId(instId).subscribe(
        (response) => {
          this.departments = response;
          // console.log("departments array in func", this.departments);
          resolve(this.departments); // Resolve the promise with the departments
        },
        (error) => {
          reject(error); // Reject the promise with the error
        }
      );
    });
  }

  getCoursesByDeptId(deptId: number) {

    return new Promise((resolve, reject) => {
      this.courses = [];
      this.courseServ.getCourseByDepartmentId(deptId).subscribe(
        (response) => {
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

  getProfileByInstitutionId(instId: number, deptName: string) {
    this.deptName = deptName;
    this.profileServ.getAllProfiles().subscribe(
      (response) => {
        //filter profiles array only to get active teachers and students
        this.profileForDept = response.filter((elem) => (elem.institutionId == instId) && (elem.activeUser == true) && ((elem.userRole == 'teacher') || (elem.userRole == 'student')))

      }
    )
  }

  getProfileByProfileId(profileId: number) {
    this.filteredProfiles = [];

    // console.log("Profiles array before API calling");
    // console.log(this.profiles);

    return new Promise((resolve, reject) => {
      this.profileServ.getProfileByAdminId(profileId).subscribe(
        (response) => {
          let profile: Profile = response;

          // console.log(profile);

          this.profiles.push(profile);

          // console.log("Profiles in getProfileByProfileId");
          // console.log(this.profiles);

          this.getProfileByInstitutionId(this.instId, '');

          // console.log("profiles in department")
          // console.log(this.profileForDept)

          //loop to get filterd profiles that belong to particular institute
          for (let profile of this.profiles) {
            for (let instProf of this.profileForDept) {
              if (profile.institutionId == instProf.institutionId) {
                this.filteredProfiles.push(profile);
              }
            }
          }

          this.profiles = this.filteredProfiles;
          this.profiles = this.getUniqueProfilesByAdminId(this.profiles);

          // console.log("profiles after loop")
          // console.log(this.profiles)
          resolve(this.profiles);
        },
        (error) => {
          reject(error); // Reject the promise with the error
        }
      );

    });
  }

  //function to get only unique array of profiles
  getUniqueProfilesByAdminId(profiles: Profile[]): Profile[] {
    const uniqueProfiles: Profile[] = profiles.reduce((unique: Profile[], profile: Profile) => {
      if (!unique.some((p: Profile) => p.adminId === profile.adminId)) {
        unique.push(profile);
      }
      return unique;
    }, []);

    return uniqueProfiles;
  }

  //get filtered profiles as per institute id and course Id provided based on 'enrolled students' and 'assigned course to teacher arrays'
  async getProfilesInCourse(instId: number, courseId: number) {
    console.log(courseId);
    this.profiles = [];
    let profile: any;
    this.profileIds = [];
    this.filteredProfileIds = [];
    this.profileIdForStuTea = [];

    // Get students by course ID
    const studentProfiles = await new Promise<any[]>((resolve, reject) => {
      this.enrollStuServ.getProfileByInstIdCourId(instId, courseId).subscribe(
        (response) => {
          const profiles = response.map((data: Enrolltostudent) => data.profileId);
          // console.log("Profiles in enroll")
          // console.log(profiles)
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });

    // Get teachers by course ID
    const teacherProfiles = await new Promise<any[]>((resolve, reject) => {
      this.assignCourseServ.getProfileByInstIdCourId(instId, courseId).subscribe(
        (response) => {
          // const profiles = response.map((data: Assignteacher) => data.profileId);
          resolve(response);
          // console.log("Profiles in teacher")
          // console.log(response)

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

    // console.log("")
    // Merge student and teacher profiles
    const profileIds = [...studentProfiles, ...teacherProfiles];

    this.profileIdForStuTea = profileIds


  }

  //code to get Department details
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
    // console.log("getAllDeptDetails(instId:number) called");
    // console.log(instId);
    await this.getDepartmentsByInstId(instId);
    // console.log("Departments length: " + this.departments.length);
    for (let dept of this.departments) {

      this.deptArray.length == this.departments.length;

      await this.getCoursesByDeptId(dept.id);
      console.log("Courses array length: " + this.courses.length);
      courseLenArr.push(this.courses.length);
      this.deptNameArray.push(dept.name);
      this.deptNameCouCnt.push(dept.name + " - " + this.courses.length);
    }
    this.deptArray[0] = courseLenArr;
    // this.deptArray[1] = this.deptNameArray;
    // this.deptArray[1] = deptNameArray;

    // console.log(this.deptArray);
  }


  getProfilesCntByRoleAndInstId(role: string, instId: number) {
    this.profileServ.getProfileByRoleAndInstitutionId(role, instId).subscribe(
      (response) => {

        if (role == 'teacher') {
          this.teachersInINst = response;
        }
        else if (role == 'student') {
          this.studentsInINst = response;
        }

      }
    )

  }

  getCourseByNameandINstId(courName: string, instId: any) {

    return new Promise((resolve, reject) => {
      this.courseServ.getCourseByInstitutionId(instId).subscribe(
        (response) => {
          this.coursesInInst = response;
          this.clickedCourse = response.filter((elem: Course) => elem.courseName == courName)
          resolve(this.clickedCourse)
        },

        (error) => {
          reject(error); // Reject the promise with the error
        }
      )
    });
  }

  getAllCourseIds(teacId: number) {
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

  //code to display course by providing course id
  async getCourseNameById(courseId: number) {
    return new Promise<void>((resolve, reject) => {
      this.courseServ.getCourseByCourseId(courseId).subscribe(
        (data) => {
          this.course = data;
          if (this.barClicked) {
            this.clickedCourseOnBar = data;
            console.log(this.clickedCourseOnBar.courseName)
          }

          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  // ----------------Code for Institutions ----------------------//



  //function to handle button click on institutes to avoid apperance of further data on  double click
  handleButtonClick(adminInstitutionId: number) {


    //var for appling css for selected institute
    this.selectedImageId = adminInstitutionId;
    const currentTime = Date.now();
    const debounceTime = 500; // Adjust this value as per your needs (in milliseconds)


    if (currentTime - this.lastClickTime > debounceTime) {
      this.lastClickTime = currentTime;

      // Execute your function here
      this.getAllDeptDetails(adminInstitutionId);
      this.getCourseByNameandINstId('', adminInstitutionId);
      this.getProfilesCntByRoleAndInstId('teacher', adminInstitutionId);
      this.getProfilesCntByRoleAndInstId('student', adminInstitutionId);
    }
  }


  //function to get all institutions
  getAllInstitutionImages() {
    // fetching all institution
    this.instServ.fetchAdminInstitutionList().subscribe(
      (response) => {
        // assigning received data to institution
        this.admininstitutions = response;


        for (let i = 0; i < this.admininstitutions.length; i++) {
          console.log(this.admininstitutions[i].adminInstitutionPicture);
        }
        this.admininstitutions.sort((a, b) => a.adminInstitutionName.toLowerCase() > b.adminInstitutionName.toLowerCase() ? 1 : -1) // order by alphabets for institution name


        //  cloning array from instituion to backupinst
        this.admininstitutions.forEach((inst) => {
          this.backupInst.push(Object.assign({}, inst));
        });

        // when data not available
        if (this.admininstitutions.length > 0) {
          this.isHidden = false;
        }
      },
      (error) => {
        this.displayEmptyRow();
        console.log('No data in table ');
      }
    );
  }

  // for displaying empty when there is no data on ui
  private displayEmptyRow() {
    if (this.admininstitutions.length <= 0) {
      this.isHidden = true;
      this.admininstitution = {} as AdminInstitution;
      this.admininstitution.adminInstitutionIsActive = true;
    }
  }

  // ----------------Code for Institutions End----------------------//


  //----------------Code for displaying data after clcicking on Departments----------------------------

  //function to display data on button click  of departments name
  hadleButtonClickOnDept(darray: any, adminInstitutionId: number) {
    const currentTime = Date.now();
    const debounceTime = 500; // Adjust this value as per your needs (in milliseconds)

    if (currentTime - this.lastClickTime > debounceTime) {
      this.lastClickTime = currentTime;
      this.getClickedDataForDept(darray, adminInstitutionId)
    }
  }


  //code for displaying data after clicking on departments
  getClickedDataForDept(data: string, instId: number) {

    this.profilesLenghtArray = [];
    let profLen: number[] = []
    this.courChartStat = true;
    this.courseNameArr = [];
    let clickedDepartment: Department[] = [];
    this.deptClicked = '';
    this.barCharts = [];
    this.studProgDetailArr = [];
    var valueBeforeHyphen = data.split(" - ")[0];


    // console.log('Received right-click data:', valueBeforeHyphen);

    this.deptClicked = valueBeforeHyphen;

    this.deptServ.getDepartmentsByInstitutionId(instId).subscribe(
      async (response) => {
        clickedDepartment = response.filter((elem) => elem.name == valueBeforeHyphen);

        await this.getCoursesByDeptId(clickedDepartment[0].id);
        //   console.log("Courses in clicked funtcion")
        //  console.log(this.courses)
        for (let cour of this.courses) {
          await this.getProfilesInCourse(instId, cour.courseId)

          // console.log("Profiles in course")
          // console.log(this.profiles)

          // console.log("Profiles in course")
          // console.log(this.profileIdForStuTea)
          // console.log("Profiles Array lenght"+this.profileIdForStuTea.length) 

          profLen.push(this.profileIdForStuTea.length);


          this.courseNameArr.push(cour.courseName)

          //  console.log(this.profilesLenghtArray)
          //  console.log(this.courseNameArr)
        }
        this.profilesLenghtArray.push(profLen)
      }
    )

  }

  //----------------Code for displaying data after clcicking on Departments End---------------------------------




  //////------------------------Code for Doughnut chart for people enrolled in course ---------------------------

  //function to get bar charts after clicking course dughnut chart
  async getClickedCourseData(data: { value: any; label: string }, instId: number) {

    this.profChartStat = true;
    this.profCategoryArr = [];
    this.profCategoryNames = ["students", "teachers"];
    this.studProgDetailArr = [];
    // console.log('Received right-click data:', data);

    // // this.popupDataValue = data.value;

    // console.log('Received right-click data:', data.value, data.label);

    await this.getCourseByNameandINstId(data.label, instId);

    this.getProfilesInCourse(instId, this.clickedCourse[0].courseId)

    this.studCntInCour;
    //   console.log("this.teaCntInCour")
    //  console.log( this.teacIdsArr);


    //  console.log("this.studIdsArr")
    //  console.log( this.studIdsArr);

    //   console.log(this.studCntInCour)
    //   console.log(this.teaCntInCour)

    this.profCategoryArr[0] = [this.studCntInCour, this.teaCntInCour];
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



        // console.log("Course Id in if loop  " + this.clickedCourse[0].courseId)
        await this.getCourseNameById(this.clickedCourse[0].courseId);


        totalStudsArr = this.courseProgressArr.filter((elem) => elem.courseId == this.clickedCourse[0].courseId)

        for (let i = 0; i < totalStudsArr.length; i++) {



          if (totalStudsArr[i].progress >= 0 && totalStudsArr[i].progress <= 25) { cnt1++; }
          else if (totalStudsArr[i].progress >= 26 && totalStudsArr[i].progress <= 50) { cnt2++; }
          else if (totalStudsArr[i].progress >= 51 && totalStudsArr[i].progress <= 75) { cnt3++; }
          else if (totalStudsArr[i].progress >= 76 && totalStudsArr[i].progress <= 100) { cnt4++; }


        }


        if (totalStudsArr.length == 0) {
          this.barCharts[0] = [0, 0, 0, 0, this.course.courseName + '  [No students]', this.course.courseId];
        }
        else {
          // this.barCharts[m] =  [Math.round((cnt1*100)/totalStudsArr.length) , Math.round((cnt2*100)/totalStudsArr.length) , Math.round((cnt3*100)/totalStudsArr.length) , Math.round((cnt4*100)/totalStudsArr.length)  , this.course.courseName]
          this.barCharts[0] = [cnt1, cnt2, cnt3, cnt4, this.course.courseName + '  [' + totalStudsArr.length + ' students]', this.course.courseId]
          // console.log(this.barCharts[0])
        }
        // }
      }
    )

  }


  //code  to get course information and to display bar chart
  getClickedData(data: { value: any; label: string }, instId: number) {
    // this.dchartcurrentIndex = 0;
    // this.barClicked = true;
    this.profilesLenghtArray = [];
    let profLen: number[] = []
    this.courChartStat = true;
    this.courseNameArr = [];
    let clickedDepartment: Department[] = [];
    this.deptClicked = '';
    this.studProgDetailArr = [];
    // console.log(this.barClicked)
    // let courseProgressArr: CourseProgress[] = [];
    // let filteredCourseProgressArr: CourseProgress[] = [];
    // console.log("Function called")
    // // Perform actions with the data
    // console.log('Received right-click data:', data);

    // this.popupDataValue = data.value;
    this.deptClicked = data.label;
    // console.log('Received right-click data:', data.value, data.label);
    // console.log()

    this.deptServ.getDepartmentsByInstitutionId(instId).subscribe(
      async (response) => {
        clickedDepartment = response.filter((elem) => elem.name == data.label);

        await this.getCoursesByDeptId(clickedDepartment[0].id);
        //   console.log("Courses in clicked funtcion")
        //  console.log(this.courses)
        for (let cour of this.courses) {
          await this.getProfilesInCourse(instId, cour.courseId)


          profLen.push(this.profileIdForStuTea.length);


          this.courseNameArr.push(cour.courseName)

          //  console.log(this.profilesLenghtArray)
          //  console.log(this.courseNameArr)
        }
        this.profilesLenghtArray.push(profLen)
      }
    )


  }

  //////------------------------Code for Doughnut chart for people enrolled in course end---------------------------








  //-------------------------------------Code for bar chart -------------------------------------------

  //fnction to get all data for course progress of students in bar chart 
  async getAllCourseProgress(teacId: number) {

    // console.log(teacId)
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
            // console.log(this.barCharts[m])
          }
        }
      }
    )
  }

  //function to get indiviudal student progress on clicking on bar of bar chart
  async handleRightClickDataForBar(data: { value: any; label: any }, courseId: number) {
    this.dchartcurrentIndex = 0;
    this.barClicked = true;

    // console.log(this.barClicked)
    let courseProgressArr: CourseProgress[] = [];
    let filteredCourseProgressArr: CourseProgress[] = [];
    // console.log("Function called")
    // // Perform actions with the data
    // console.log('Received right-click data:', data);

    this.popupDataValue = data.value;
    this.popupDataLabel = data.label;

    // console.log('Received right-click data:', this.popupDataValue, this.popupDataLabel);
    // console.log(courseId)

    const rangeArray = this.popupDataLabel.split("-"); // Split the string into an array of two elements

    const startValue = parseInt(rangeArray[0]); // Parse the first element as an integer
    const endValue = parseInt(rangeArray[1]); // Parse the second element as an integer

    await this.getCourseNameById(courseId);

    this.assignCourseServ.getTeacherByCourseId(courseId).subscribe(
      (response) => {

        this.teacherId = response;

      }
    )

    // console.log(startValue); // Output: 26
    // console.log(endValue); // Output: 75
    // console.log( parseInt(this.popupDataLabel))
    this.courseProgServ.getAllCourseProgress().subscribe(
      (data) => {
        // console.log(startValue); // Output: 26
        // console.log(endValue); // Output: 75
        courseProgressArr = data;
        filteredCourseProgressArr = courseProgressArr.filter((elem) => elem.courseId == courseId && ((elem.progress >= startValue) && (elem.progress <= endValue)))

        // console.log(filteredCourseProgressArr)
        this.courseProgressArr = filteredCourseProgressArr

      }
    ),
      (error: any) => { error }
    this.getStudentNamesandCourProgress();
  }
  //-------------------------------------Code for bar chart end--------------------------------------------

  // -----------------------------Code for student doughnut chart-----------------------------------

  //get individual student progress on doughnut chart
  getStudentNamesandCourProgress() {
    this.closeButtonStatus = false;
    this.studProgDetailArr = [];
    let profile: Profile = new Profile();

    // console.log(this.courseProgressArr);

    for (let i = 0; i < this.courseProgressArr.length; i++) {
      // console.log("Entered in for loop");
      const remainingPercentage: number = 100 - this.courseProgressArr[i].progress;


      this.profileServ.getProfileByAdminId(this.courseProgressArr[i].studentId).subscribe(
        (data) => {
          profile = data;
          // console.log(i)
          // console.log(profile);
          this.studProgDetailArr.push([this.courseProgressArr[i].progress, remainingPercentage, profile.firstName + ' ' + profile.lastName]);

          // Check if all the data has been retrieved

        }
      );

    }
    // console.log(this.studProgDetailArr);
  }



  //code for next button on progress panel of student
  doughnutNext() {

    this.dchartcurrentIndex += 3;
    console.log("this.dchartcurrentIndex value     " + this.dchartcurrentIndex)

  }

  //code for previous button on progress panel of student
  doughnutPrevious() {


    this.dchartcurrentIndex -= 3;

  }


  // --------------------------------------------------------------------------------------------------------


  // -----------------------------Code for student doughnut chart end-----------------------------------

}
