import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-insertinstituteadminprofile',
  templateUrl: './insertinstituteadminprofile.component.html',
  styleUrls: ['./insertinstituteadminprofile.component.css']
})
export class InsertinstituteadminprofileComponent {
  _instituteAdmin = new InstituteAdmin();

  constructor(
    private _instituteAdminService: InstituteAdminServiceService,
    private _route: Router
  ) { }

  _addInstituteAdmin() {

    this._instituteAdminService
      ._addInstituteAdminList(this._instituteAdmin)
      .subscribe((data) => {
        console.log(data);
        // _addInstituteObj = data;
        // this._instituteAdmin2[this._instituteAdmin2.indexOf(_instituteAdminObject)] = this._instituteAdminObjCopy[this._instituteAdminObjCopy.findIndex(data => data.firstName == _instituteAdminObject.firstName)];
        // this._instituteAdmin2.push(_addInstituteObj);
        alert('Institute Added Successfully');


        this._route.navigate(['displayInstituteAdmin'])
      });
  }

}
