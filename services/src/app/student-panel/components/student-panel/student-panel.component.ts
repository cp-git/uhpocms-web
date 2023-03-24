import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent {



  // Declare class properties
  profileId: any;

  userName!: string;

  // Inject Router and ActivatedRoute services into constructor
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) {

  }


  // Initialize component properties with current route parameters
  ngOnInit(): void {
    this.profileId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.profileId);
  }

  // Navigate to student course page with current profileId
  RedirectToStudentCourse() {
    this._route.navigate(['studentcourse', { id: this.profileId }]);
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
