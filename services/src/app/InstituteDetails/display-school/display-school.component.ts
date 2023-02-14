import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'app/admindepartment/department';
import { DepartmentService } from 'app/admindepartment/service/department.service';



@Component({
  selector: 'app-display-school',
  templateUrl: './display-school.component.html',
  styleUrls: ['./display-school.component.css']
})
export class DisplaySchoolComponent implements OnInit {


  public institutionId: any;

  constructor(private _router: Router, private _route: ActivatedRoute) {
    this.institutionId = 0;
  }

  ngOnInit(): void {
    this.institutionId = this._route.snapshot.paramMap.get('id');
    // alert(this.institutionId);
  }

}
