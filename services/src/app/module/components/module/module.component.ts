import { Component } from '@angular/core';
import { Module } from 'app/module/class/module';
import { ModuleService } from 'app/module/services/module.service';
import { ModuleColumn, ModuleAllColumn, UpdateAllColumn } from 'app/module/column-names/module-column';
import { Course } from 'app/teacher-course/class/course';
import { Location } from '@angular/common';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { Profile } from 'app/profiles/class/profile';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { DepartmentService } from 'app/department/services/department.service';
import { Department } from 'app/department/class/department';
import { AdvFilterPipe } from 'app/shared/pipes/adv-filter/adv-filter.pipe';
import { FilterPipe } from 'app/shared/pipes/filter/filter.pipe';
import { CourseDepartment } from 'app/teacher-course/class/course-department';
import { ModuleFileService } from 'app/module-file/services/module-file.service';
import { ModuleFile } from 'app/module-file/class/module-file';
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {

  moduleName: string = 'Module Administration';

  //screen view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewOne: boolean = false;
  viewAll: boolean = true;
  viewActivate: boolean = false;

  // for buttons to view
  // showAddButton: boolean = true;
  // showActivateButton: boolean = true;

  dataAvailable: boolean = false;

  columnNames: any;
  allColumnNames: any;
  allColumnNames1: any;

  readonly primaryIdColumnName: string = 'id';

  allData: Module[] = [];
  allInActiveData: Module[] = [];
  courses: Course[] = [];
  filterCourses: Course[] = [];

  sessionData: any;
  data: any;

  userRole: any;
  titleWithUserRole: boolean = true;
  courseId: any;
  profileId: any;

  emptyModule: Module;  // empty admin role
  currentData!: Module;  // for update and view, to show existing data
  moduleFilesInModule: ModuleFile[] = [];

  // for user Permissions
  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];
  userModule = userModule;

  adminInstitutions: AdminInstitution[] = []
  departments: Department[] = [];

  selectedInstitutionId!: any;
  selectedDepartmentId!: any;

  advFilterPipe!: AdvFilterPipe;
  filterPipe!: FilterPipe;

  constructor(private service: ModuleService,
    private dialogBoxServices: DialogBoxService,
    private location: Location,
    private courseService: TeacherCourseService,
    private userPermissionService: AuthUserPermissionService,
    private institutionService: AdmininstitutionService,
    private departmentService: DepartmentService,
    private moduleFileService: ModuleFileService

  ) {


    // assigng headers

    this.columnNames = ModuleColumn;
    this.allColumnNames = ModuleAllColumn;
    this.allColumnNames1 = UpdateAllColumn;

    // creating empty object
    this.emptyModule = new Module();
    // this.loadCourses();
    this.profileId = sessionStorage.getItem('profileId');
    this.courseId = sessionStorage.getItem('courseId');

    this.userRole = sessionStorage.getItem('userRole');

    // Assining default values
    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false
    }
  }


  ngOnInit(): void {
    this.loadAndLinkUserPermissions();
    //  this.service.get

    this.loadDataBasedOnRole(this.userRole);
  }

  // back button functionality
  back() {
    this.emptyModule = {} as Module;
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      // this.buttonsArray.showAddButton = true;
      // this.buttonsArray.showActivateButton = true;
      this.userPermissionService.toggleButtonsPermissions(userModule.MODULE, this.userAndRolePermissions, this.buttonsArray);

    } else {
      this.location.back();
    }

  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.MODULE, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(userModule.MODULE, this.userAndRolePermissions, this.buttonsArray);
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all admin roles screen 
    this.viewOne = true;
    this.viewAll = false;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Module): void {

    // hiding update screen and displaying all admin roles screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Module): void {
    if (objectReceived.moduleId !== null) {
      this.deleteModule(objectReceived.moduleId);
    }
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Module): void {
    this.activeModule(objectReceived.moduleId);
  }

  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // on addComponents's submit button clicked
  onAddModuleSubmit(objectReceived: Module): void {
    this.addModule(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateModuleSubmit(objectReceived: Module) {
    this.updateModule(objectReceived);
  }

  //////////////////////////////////////////////////////  LOAD COURSES  ////////////////////////////////////////////////////
  private async loadCourses() {
    await this.loadIdsOfAllCoursesWithDepartmentId();
    // calling service to get all data
    this.courseService.getAllCourses().subscribe(
      response => {

        this.filterCourses = response;
        // const courseData = response; //assign data to local variable
        this.courses = [];
        response.forEach((course: Course) => {
          this.courseDepartments.find((coursedepartment: CourseDepartment) => {
            if (course.courseId == coursedepartment.courseId) {
              this.courses.push({
                ...course,
                departmentId: coursedepartment.department_id,
              });
            }
            this.courses.sort((a, b) => a.courseName.toLowerCase() > b.courseName.toLowerCase() ? 1 : -1) // order by alphabets for course name
          })
        })



      },
      error => {
        console.log('No data in table ');

      }
    );
  }

  courseDepartments: CourseDepartment[] = [];

  //////////////////////////////////////   LOAD ID OF ALL COURSES WITH DEPARTMENT ID  //////////////////////////
  private async loadIdsOfAllCoursesWithDepartmentId() {

    try {
      const data = await this.courseService.getCoursesDepartmentId().toPromise();

      this.courseDepartments = data;

    } catch (error) {
      console.log("no data fetched");
    }
  }



  ///////////////////////////////////////////  UPDATE THE MODULE BY USING MODULE ID  /////////////////////////////////////
  private updateModule(currentData: Module) {
    // calling service for updating data
    if (currentData.moduleId !== null) {
      this.service.updateModuleById(currentData.moduleId, currentData).subscribe(
        response => {

          this.dialogBoxServices.open("Module updated successfully !", 'information');
          this.back();
        },
        error => {

          this.dialogBoxServices.open("Module updation failed !", 'warning');
        }
      );
    }
  }

  ///////////////////////////////////////////////  ADD A NEW MODULE ////////////////////////////////////////////////


  /*
    Made a change added module it active directly
  */
  private addModule(currentData: Module) {
    // if (currentData.moduleStartDate && currentData.moduleEndDate && currentData.moduleEndDate <= currentData.moduleStartDate) {
    //   alert("End date must be after start date");
    //   return;
    // }
    currentData.moduleIsActive = true;  // setting active false
    // calling service for adding data

    this.service.addTeacherModule(currentData).subscribe(
      (data) => {


        this.dialogBoxServices.open("Module added Successfully but its status is InActive", 'information');
        this.emptyModule = {} as Module;
        this.ngOnInit();
        this.back();
      },
      (error) => {
        this.dialogBoxServices.open("Module Name is already exist pls select another name..", 'warning');

      });
  }

  /////////////////////////////////////// GET ASSIGN COURSES BASED ON PROFILE USED COURSE SERVICE API  /////////////////////////////////
  private getAssignedCoursesByProfileId(teacherId: number) {
    this.courseService.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {

        this.courses = data;
        this.filterCourses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ////////////////////////////////////  COURSES ENROLLED TO TEACHER USING PROFILE ID    /////////////////////////////////////
  private getEnrolledCoursesByProfileId(studentId: number) {
    this.courseService.getCourseByStudentId(studentId).subscribe(
      (data) => {

        this.courses = data;
        this.filterCourses = data;
      },
      error => {
        console.log(error);
      }
    );
  }




  /////////////////////////////////////// GET ALL MODULES  ///////////////////////////////
  private getAllModules() {
    this.dataAvailable = true;

    // calling service to get all data
    this.service.getAllModules().subscribe(
      response => {

        this.allData = response;
        // this.allData = this.allData.filter(data =>
        //   this.courses.map(
        //     course => course.courseId).includes(data.courseId_id));

        this.allData.sort((a, b) => a.moduleName.toLowerCase() > b.moduleName.toLowerCase() ? 1 : -1) // order by alphabets for module name



        // if no data available
        if (this.allData.length > 0) {
          this.dataAvailable = true;
        }
      },
      error => {
        console.log('No data in table ');
      }
    );
  }



  ////////////////////////////////    DELETE THE MODULE USING MODULE  ID    ///////////////////////////////// 
  private deleteModule(moduleId: number) {

    this.dialogBoxServices.open('Are you sure you want to delete this Module ? ', 'decision').then((response) => {
      if (response) {

        // Do something if the user clicked OK
        // calling service to soft delete
        this.service.deleteModuleById(moduleId).subscribe(
          (response) => {
            console.log("delete response..." + response)
            this.dialogBoxServices.open('Module deleted successfully', 'information');
            this.ngOnInit();
          },
          (error) => {
            this.dialogBoxServices.open('Module deletion Failed', 'warning');
          }
        );
      } else {

        // Do something if the user clicked Cancel
      }
    });
  }


  /////////////////////////////////  GET INACTIVE MODULE LIST  /////////////////////////////////////////////
  private getInactiveModule() {

    // calling service to get all inactive record
    this.service.getInactivemoduleList().subscribe(
      response => {
        this.allInActiveData = response;
        this.allInActiveData.sort((a, b) => a.moduleName.toLowerCase() > b.moduleName.toLowerCase() ? 1 : -1) // order by alphabets for module name
      },
      error => {
        console.log('No data in table ');
      }
    );

  }

  ///////////////////////////   GET MODULE FILE BY MODULE ID    /////////////////////////////////////////
  async getModuleFileByModuleId(moduleId: number): Promise<any> {
    try {
      const response: any = await this.moduleFileService.getModuleFilesByModuleId(moduleId).toPromise();
      this.moduleFilesInModule = response;

    } catch (error) {
      console.error('Error fetching module files:', error);
      throw error;
    }
  }

  ///////////////////////////////////////////// ACTIVATE MODULE BY MODULE ID  ///////////////////////////////
  private async activeModule(moduleId: any) {
    try {


      this.service.activateModuleById(moduleId).subscribe(
        () => {
          this.dialogBoxServices.open('Module Activated', 'information');
          this.ngOnInit();
        },
        error => {
          console.error('Error activating module:', error);
          this.dialogBoxServices.open('Failed to Activate', 'warning');
        }
      );

    } catch (error) {
      console.error('Error during module activation:', error);
      this.dialogBoxServices.open('An error occurred during module activation', 'warning');
    }
  }


  private loadDataBasedOnRole(userRole: any) {


    switch (userRole) {
      // case 'admin' || 'coadmin':
      //   this.loadAdminInstitutions();
      //   this.loadDepartments();
      //   this.loadCourses();
      //   this.getAllModules();
      //   this.getInactiveModule();

      //   break;
      case 'teacher':
        // this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);

        this.getAssignedCoursesByProfileId(this.profileId);
        this.getModulesOfAssignedCoursesByProfileId(this.profileId);
        break;

      case 'student':
        // this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);

        // this.getEnrolledCoursesByProfileId(this.profileId);
        // this.getModulesOfEnrolledCoursesByProfileId(this.profileId);

        this.getAssignedCoursesByProfileId(this.profileId);
        this.getModulesOfAssignedCoursesByProfileId(this.profileId);
        break;
    }
  }

  ///////  GETTING ALL INSTITUTION AND DEPARTMENTS OF PERTICULAR INSTITUTE BY PROFILE ID ADMIN INSTITUTION API ///////
  getInstitutionAndDepartmentsOfUserByUserId(profileId: any) {
    this.institutionService.getInstitutionByProfileId(profileId).subscribe(
      (response) => {
        this.adminInstitutions = response;

        // for getting active and inactive departments using institution id
        this.getDepartmentByProfileId(profileId);
      }
    );
  }


  ////////// GET ALL ACTIVE DEPARTMENT BY INSTITUTION ID ADMIN DEPARTMENT API ///////
  getDepartmentByProfileId(profileId: any) {
    this.departmentService.getDepartmentsOfAssignCoursesByProfileId(profileId).subscribe(
      (response) => {

        this.departments = response;
      }
    );
  }

  ////////////////////////  MODULES ASSIGN TO PERTICULAR PROFILE ID   //////////////////////////////

  /*
    code for getting active and deactivate data from module
  */

  getModulesOfAssignedCoursesByProfileId(profileId: number) {
    this.service.getModulesOfAssignedCoursesByProfileId(profileId).subscribe(
      (response) => {
        console.log(response);
        this.allData = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == true);
        this.allInActiveData = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == false);


      }
    );
  }


  /////////////////////////  MODULES OF ENROLLED COURSES BY PROFILE ID   /////////////////////////////

  /*
   Used to filter active and inactive data
  */
  getModulesOfEnrolledCoursesByProfileId(profileId: number) {
    this.service.getModulesOfEnrolledCoursesByProfileId(profileId).subscribe(
      (response) => {
        console.log(response);

        this.allData = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == true);
        this.allInActiveData = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == false);
      }
    );
  }



  //////////////////////////////////// LOADING ADMIN INSTITUTION FROM SESSION STORAGE  //////////////////////

  private loadAdminInstitutions() {

    try {
      this.sessionData = sessionStorage.getItem('admininstitution');
      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.adminInstitutions.push(this.data[inst]);

      }
    }
    catch (err) {
      console.log("Error", err)
    }
  }




  /////////////////////////////// FETCHING DEPARTMENTS FROM SESSION STORAGE  //////////////////////////////////
  private loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      response => {
        this.departments = response;
      },
      error => {
        console.log("failed to get departments");
      }
    )
  }

  onChangeInstitution() {
    this.selectedDepartmentId = undefined;

  }
  onChangeDepartment() {

    this.filterCourses = this.advFilterPipe.transform(this.courses, 'departmentId', this.selectedDepartmentId)

  }
}
