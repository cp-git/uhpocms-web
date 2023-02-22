import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent {

  profileId: any;
  userName: String | undefined;
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) {
    this.profileId = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.userName = this._activatedRoute.snapshot.params['userName'];

  }
  RedirectToStudentCourse() {
    this._route.navigate(['studentcourse', { id: this.profileId }]);
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
