import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent {

  profileId: any;
  userName!: string;
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.profileId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName);
  }
  RedirectToStudentCourse() {
    this._route.navigate(['studentcourse', this.userName, { id: this.profileId }]);
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
    this._route.navigate(['studentmodule', { id: this.profileId }]);
  }

  redirectToNotification() {
    this._route.navigate(['announcement/student', { id: this.profileId }])
  }



}
