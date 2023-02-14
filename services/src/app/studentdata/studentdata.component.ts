import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent {

  constructor(private _route: Router) { }

  RedirectToQuiz() {
    this._route.navigate(['quiz']);
  }

  RedirectToCourse() {
    this._route.navigate(['course']);
  }

  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }

}
