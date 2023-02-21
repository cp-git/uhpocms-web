import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-departmentcourse',
  templateUrl: './view-departmentcourse.component.html',
  styleUrls: ['./view-departmentcourse.component.css']
})
export class ViewDepartmentcourseComponent {


  public institutionId: any;

  constructor(private _router: Router, private _route: ActivatedRoute) {
    this.institutionId = 0;
  }

  ngOnInit(): void {
    this.institutionId = this._route.snapshot.paramMap.get('id');
    // alert(this.institutionId);
  }

}
