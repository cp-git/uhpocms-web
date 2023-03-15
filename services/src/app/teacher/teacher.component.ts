import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

  teacherId: any;
  userName!: string;
  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)

  }

  RedirectToTeacherCourse() {
    this._route.navigate(['teachercourse', { id: this.teacherId }]);
  }

  RedirectToModule() {
    this._route.navigate(['teachermodule', { id: this.teacherId }, this.userName]);
  }

  RedirectToQuiz() {

    this._route.navigate(['quiz', this.userName]);
  }


  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }

  redirectToAnnouncements() {
    this._route.navigate(['announcement/teacher', { id: this.teacherId }])
  }

}
