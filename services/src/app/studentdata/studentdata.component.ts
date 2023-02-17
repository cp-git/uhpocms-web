import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent implements OnInit {
  profileId: number;
  constructor(private _route: Router, private activatedRoute: ActivatedRoute) {
    this.profileId = 0;
  }

  RedirectToQuiz() {
    this._route.navigate(['quiz']);
  }

  RedirectToCourse() {
    this._route.navigate(['course']);
  }

  RedirectToStudentCourse() {
    this._route.navigate(['studentcourse'], { state: { id: this.profileId } });
  }

  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }
  ngOnInit() {
    alert("stud data" + this.activatedRoute.snapshot)
    const currentNavigation = this.activatedRoute.snapshot;
    if (currentNavigation) {
      // Use the currentNavigation object safely here
      const state = currentNavigation.params;
      if (state) {
        alert(state);
        this.profileId = state['id'];

        // Do something with the data (e.g. display it in the component)
      }
    }



  }

}
