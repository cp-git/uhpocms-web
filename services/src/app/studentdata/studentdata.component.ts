import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent {

  userName: String | undefined;
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.userName = this._activatedRoute.snapshot.params['userName'];

  }

  RedirectToQuiz() {
    const role = 'student';
    this._route.navigate(['quiz', role]);
  }

  RedirectToCourse() {
    const role = 'student';
    this._route.navigate(['course/userrole/', role]);
  }

  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }




}
