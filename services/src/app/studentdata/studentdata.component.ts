import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-studentdata',
  templateUrl: './studentdata.component.html',
  styleUrls: ['./studentdata.component.css']
})
export class StudentdataComponent implements OnInit {
  profileId: any;

  constructor(private _route: Router, private activatedRoute: ActivatedRoute) {
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    // const snapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    //  alert("snapsot " + JSON.stringify(this.activatedRoute.snapshot.paramMap.get('id')));
  }

  RedirectToQuiz() {
    this._route.navigate(['quiz']);
  }

  RedirectToCourse() {
    this._route.navigate(['course']);
  }

  RedirectToStudentCourse() {
    this._route.navigate(['studentcourse', { id: this.profileId }]);
  }

  RedirectTOLogin() {
    this._route.navigate(['authenticationlogin'])
  }
  ngOnInit() {
    // alert("stud data" + this.activatedRoute.snapshot)
    // const currentNavigation = this.activatedRoute.snapshot;
    // if (currentNavigation) {
    //   // Use the currentNavigation object safely here

    //   const state = currentNavigation.params;
    //   if (state) {
    //     alert("state" + JSON.stringify(state));
    //     this.profileId = state['id'];

    //     // Do something with the data (e.g. display it in the component)
    //   }
  }



}

