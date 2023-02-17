import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  constructor(private _route: Router) { }

  RedirectToCourse() {
    const role = 'teacher';
    this._route.navigate(['course/userrole/', role]);
  }

  RedirectToModule() {
    this._route.navigate(['teachermodule']);
  }

  RedirectToQuiz() {
    const role = 'teacher';
    this._route.navigate(['quiz', role]);
  }


  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }


}
