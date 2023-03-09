import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private location: Location, private router: Router) {

  }

  ngOnInit(): void {
    // alert()
  }
  home() {
    this.router.navigate(['/Department']);
  }
}

