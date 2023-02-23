import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent {

  userName: String | undefined;
  studentid: any;
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) {
    this.studentid = 0;
  }

  ngOnInit(): void {

    this.userName = this._activatedRoute.snapshot.params['userName'];
    this.studentid = this._activatedRoute.snapshot.paramMap.get('profileid')

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

  RedirectToStudentModule() {
    this._route.navigate(['studentmodule', { profileid: this.studentid }])
  }

}
