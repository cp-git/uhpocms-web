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
    this._route.navigate(['course']);
  }

  RedirectToModule() {
    this._route.navigate(['teachermodule']);
  }

  RedirectToQuiz() {
    this._route.navigate(['quiz']);
  }


  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }


}
