import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.css']
})
export class TeacherPanelComponent {

  teacherId: any;
  userName!: string;
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.teacherId)



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

}
