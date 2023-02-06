import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private _route: Router) {

  }

  category() {
    //this._dialog.open(AdminroleComponent);
    this._route.navigate(['category']);
  }
  module() {
    //this._dialog.open(AdminroleComponent);
    this._route.navigate(['teachermodule']);
  }

  addModule() {
    this._route.navigate(['addModule'])
  }
  addCategory() {
    this._route.navigate(['addCategory'])
  }

}
