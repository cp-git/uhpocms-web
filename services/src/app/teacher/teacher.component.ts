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
    this.teacherId = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    this.userName = this._activatedRoute.snapshot.params['userName'];

  }
  RedirectToCourse() {
    const role = 'teacher';
    this._route.navigate(['course/userrole/', role]);
  }
  RedirectToTeacherCourse() {
    this._route.navigate(['teachercourse', { id: this.teacherId }]);
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
