import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/quiz/class/quiz';
import { TeacherQuizAllColumn, TeacherQuizColumn, TeacherQuizUpdateColumn } from 'app/quiz/column-names/quiz-column';
import { QuizService } from 'app/quiz/services/quiz.service';
import { Location } from '@angular/common';
import { TeacherCourseService } from 'app/teacher-course/services/teacher-course.service';
import { ModuleService } from 'app/module/services/module.service';
import { CategoryService } from 'app/category/services/category.service';
import { Course } from 'app/teacher-course/class/course';
import { Module } from 'app/module/class/module';
import { Category } from 'app/category/class/category';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { userModule } from 'app/permissions/enum/user-module.enum';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  // title heading for Quiz
  moduleName: string = "Quiz";

  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  // for buttons to view
  // showAddButton: boolean = true;
  // showActivateButton: boolean = true;

  //Display Column Names

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  updateColumnNames: any;
  allColumnViewNames: any; // header for all visible column data

  emptyQuiz!: Quiz;  // empty Quiz
  currentData!: Quiz;  // for update and view, to show existing data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'quizId';

  //Storing the Data in Array
  allQuizData: Quiz[] = []; // list of active Quiz
  allInActiveData: Quiz[] = []; // list of inactive Quiz

  profileId: any;

  courses: Course[] = [];
  modules: Module[] = [];
  categories: Category[] = [];
  userRole: any;
  titleWithUserRole: boolean = true;

  // for user Permissions
  buttonsArray: any;
  userRoleId: any;
  userAndRolePermissions: AuthUserPermission[] = [];
  userModule = userModule;

  constructor(
    private quizService: QuizService,
    private location: Location,
    private courseService: TeacherCourseService,
    private moduleService: ModuleService,
    private categotyService: CategoryService,
    private dialogBoxService: DialogBoxService,
    private userPermissionService: AuthUserPermissionService,
  ) {

    this.userRole = sessionStorage.getItem('userRole');
    // assigng headers
    this.columnNames = TeacherQuizColumn;
    this.allColumnNames = TeacherQuizAllColumn;

    this.updateColumnNames = TeacherQuizUpdateColumn;


    // creating empty object
    this.emptyQuiz = new Quiz();
    //this.loadAllCourses();

    //calling services for foreign key data (dropdown)
    this.loadAllCategories();
    // this.loadAllCourses();
    this.loadAllModules();
    this.profileId = sessionStorage.getItem('profileId');

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

    // this.getInActiveQuiz(); // for getting all inactive Quizs
    // this.getAssignedCoursesOfTeacher(this.profileId)
    this.loadDataBasedOnRole(this.userRole);
  }


  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.QUIZ, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(this.userAndRolePermissions, this.buttonsArray);
  }

  // function will call when child update button is clicked 
  onChildActivateClick(quiz: Quiz): void {
    this.activateQuiz(quiz);
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all Quizs screen 
    this.viewOne = true;
    this.viewAll = false;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Quiz): void {

    // hiding update screen and displaying all Quizs screen 
    this.viewAll = false;
    this.viewUpdate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Quiz): void {
    this.deleteQuiz(objectReceived.title);
  }

  // on addComponents's submit button clicked
  onAddQuizSubmit(objectReceived: Quiz): void {
    this.addQuiz(objectReceived);
  }

  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onActivateClick() {
    this.viewAll = false;
    this.viewActivate = true;
    this.buttonsArray.showAddButton = false;
    this.buttonsArray.showActivateButton = false;
  }

  // on updateComponents's submit button clicked
  onUpdateQuizSubmit(objectReceived: Quiz) {
    this.updateRole(objectReceived);
  }


  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      this.viewActivate = false;

      // this.buttonsArray.showAddButton = true;
      // this.buttonsArray.showActivateButton = true;
      this.userPermissionService.toggleButtonsPermissions(this.userAndRolePermissions, this.buttonsArray);

    } else {
      this.location.back();
    }
  }


  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all quizzes
  getAllQuizzes(courses: Course[]) {
    this.quizService.getAllQuizzes().subscribe(
      response => {

        this.allQuizData = response;
        this.allQuizData = this.allQuizData.filter(data =>
          courses.map(
            course => course.courseId).includes(data.courseId));

        this.allQuizData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) // order by alphabets for title
        console.log("filtered daTA " + JSON.stringify(this.allQuizData));

      },
      (error) => {
        console.log('Quiz data not found');
      }
    );
  }


  // deleting quiz using title (soft delete)
  deleteQuiz(title: string) {
    this.dialogBoxService.open('Are you sure you want to delete this Quiz ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        this.quizService.deleteQuiz(title).subscribe(
          (data) => {

            this.dialogBoxService.open('Quiz deleted successfully', 'information');
            this.ngOnInit();
          },
          (error) => {
            this.dialogBoxService.open('Quiz deletion Failed', 'warning');
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  // for adding quiz
  addQuiz(currentData: Quiz) {

    currentData.active = true;
    this.quizService.addQuiz(currentData).subscribe(
      data => {
        this.dialogBoxService.open('Quiz Added successfully', 'information')
        this.emptyQuiz = {} as Quiz;
        this.ngOnInit();
        this.back();

      }
      ,
      error => {
        this.dialogBoxService.open('Failed to add Quiz', 'warning')
      }
    )

  }


  // for updating quiz using title
  private updateRole(currentData: Quiz) {
    // calling service for updating data
    this.quizService.updateQuiz(currentData.title, currentData).subscribe(
      response => {
        this.dialogBoxService.open('Quiz Updated successfully', 'information')
        this.ngOnInit();
        this.back();
      },
      error => {
        this.dialogBoxService.open('Quiz updation failed', 'warning')
      }
    );
  }


  // for getting all inactive quiz
  private getInActiveQuiz() {

    // calling service to get all inactive record
    this.quizService.getInactiveQuizList().subscribe(
      response => {
        this.allInActiveData = response;
        this.allInActiveData.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) // order by alphabets for title

      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // for activating quiz using title
  private activateQuiz(quiz: Quiz) {

    // calling service to activating Quiz
    this.quizService.updateActiveStatus(quiz.title, quiz).subscribe(
      response => {
        console.log("Activated Quiz");
        this.dialogBoxService.open('Quiz Activated', 'information')
        this.ngOnInit();
      },
      error => {
        this.dialogBoxService.open('Failed to Activate', 'warning')
      }
    );
  }

  // loading courses 
  private loadAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      error => {
        console.log("No courses loaded");
      }
    );
  }

  // loading modules 
  private loadAllModules() {
    this.moduleService.getAllModules().subscribe(
      (data) => {
        this.modules = data;
      },
      error => {
        console.log("No modules loaded");
      }
    )
  }

  // loading categories 
  private loadAllCategories() {
    this.categotyService._getAllCategorys().subscribe(
      (data) => {
        this.categories = data;
      },
      error => {
        console.log("No categories loaded");
      }
    )
  }

  //getting courses assigned to teacher using profileId
  private getAssignedCoursesOfTeacher(teacherId: number) {
    this.courseService.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {
        console.log(data);

        this.courses = data;
        this.getAllQuizzes(this.courses);  // for getting all active Quizs

      },
      error => {
        console.log(error);
      }
    );
  }

  private loadDataBasedOnRole(userRole: any) {
    console.log(userRole);

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
        this.getActiveQuizzesOfModulesOfAssignedCoursesByProfileId(this.profileId);
        this.getInactiveQuizzesOfModulesOfAssignedCoursesByProfileId(this.profileId);

        break;

      case 'student':
        // this.getInstitutionAndDepartmentsOfUserByUserId(this.profileId);

        this.getEnrolledCoursesByProfileId(this.profileId);
        this.getModulesOfEnrolledCoursesByProfileId(this.profileId);
        this.getActiveQuizzesOfModulesOfEnrolledCoursesByProfileId(this.profileId);
        this.getInactiveQuizzesOfModulesOfEnrolledCoursesByProfileId(this.profileId);

        break;
    }
  }

  //getting courses assigned to teacher using profileId
  private getAssignedCoursesByProfileId(teacherId: number) {
    this.courseService.getAssignedCourseOfTeacher(teacherId).subscribe(
      (data) => {
        console.log("courses " + JSON.stringify(data));
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  //getting courses assigned to teacher using profileId
  private getEnrolledCoursesByProfileId(studentId: number) {
    this.courseService.getCourseByStudentId(studentId).subscribe(
      (data) => {
        console.log("courses " + JSON.stringify(data));
        this.courses = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getModulesOfAssignedCoursesByProfileId(profileId: number) {
    this.moduleService.getModulesOfAssignedCoursesByProfileId(profileId).subscribe(
      (response) => {
        this.modules = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == true);
        // this.allInActiveData = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == false);
        // console.log(this.allInActiveData);
        // console.log(this.allData);


      }
    );
  }

  getModulesOfEnrolledCoursesByProfileId(profileId: number) {
    this.moduleService.getModulesOfEnrolledCoursesByProfileId(profileId).subscribe(
      (response) => {
        this.modules = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == true);
        // this.allInActiveData = response.filter((data: { moduleIsActive: boolean; }) => data.moduleIsActive == false);
      }
    );
  }

  getActiveQuizzesOfModulesOfAssignedCoursesByProfileId(profileId: number) {
    this.quizService.getActiveQuizzesOfModulesOfAssignedCoursesByProfileId(profileId).subscribe(
      (data) => {
        this.allQuizData = data;
      }

    )
  }

  getInactiveQuizzesOfModulesOfAssignedCoursesByProfileId(profileId: number) {
    this.quizService.getInactiveQuizzesOfModulesOfAssignedCoursesByProfileId(profileId).subscribe(
      (data) => {
        this.allInActiveData = data;
      }

    )
  }

  getActiveQuizzesOfModulesOfEnrolledCoursesByProfileId(profileId: number) {
    this.quizService.getActiveQuizzesOfModulesOfEnrolledCoursesByProfileId(profileId).subscribe(
      (data) => {
        this.allQuizData = data;
      }

    )
  }

  getInactiveQuizzesOfModulesOfEnrolledCoursesByProfileId(profileId: number) {
    this.quizService.getInactiveQuizzesOfModulesOfEnrolledCoursesByProfileId(profileId).subscribe(
      (data) => {
        this.allInActiveData = data;
      }

    )
  }
}
