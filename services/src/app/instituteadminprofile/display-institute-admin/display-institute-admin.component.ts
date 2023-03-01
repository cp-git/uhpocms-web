import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authuser } from 'app/authuser/authuser';
import { AdminInstitution } from '../admin-institution';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-display-institute-admin',
  templateUrl: './display-institute-admin.component.html',
  styleUrls: ['../../app.component.css'],
})
export class DisplayInstituteAdminComponent {
  _instituteAdmin2: InstituteAdmin[] = [];

  _instituteAdminArray: InstituteAdmin[] = [];

  _instituteAdminObj = new InstituteAdmin();

  _instituteAdmin = new InstituteAdmin();

  _instituteAdminObjCopy: InstituteAdmin[] = [];

  _adminInstitutions: AdminInstitution[] = [];

  _authUsers: Authuser[] = [];
  // for extra row when there is no data
  isHidden: boolean = true;
  selected: any;

  constructor(
    private _instituteAdminService: InstituteAdminServiceService,
    private _route: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login']);
    } else {
      this._getAllList();
      this._getAllAdminInstitutions();
      this._getAllAuthUsers();
    }
  }

  //get all data frmo databasea
  _getAllList() {
    this._instituteAdminService
      ._getAllInstituteAdminList()
      .subscribe((data) => {
        this._instituteAdminArray = data;
        console.log(data);
        if (this._instituteAdminArray.length > 0) {
          this.isHidden = false;
        }
        //  cloning array from departments to backupDept
        // this._instituteAdminArray.forEach((institute: any) => {
        // this._instituteAdminObjCopy.push(Object.assign({}, institute))
      });

    //get all institution ids

    //  if (this._instituteAdminArray.length > 0) {
    //     this.isHidden = true;
    //  }
    // },
    //  )
  }

  _getAllAdminInstitutions() {
    this._instituteAdminService._getAllAdminInstitution().subscribe((data) => {
      this._adminInstitutions = data;
    });
  }


  _getAllAuthUsers() {
    this._instituteAdminService._getAllAuthUsersList().subscribe((data) => {
      this._authUsers = data;
    });

  }

  //insert a data in database
  _addInstituteAdmin() {
    this._route.navigate(['insertadminprofile'])

  }

  //update a data in database
  _updateInstituteAdmin(firstName: string) {

    this._route.navigate(['/updateinstituteadminprofile', firstName]);
  }
  // this._instituteAdminService._getInstituteAdminList(firstName).subscribe(
  //   (data) => {
  //     console.log(data);
  //     this._instituteAdminObj = data;

  //     this._instituteAdminService
  //       ._updateInstituteAdminList(firstName, _instituteAdmin)
  //       .subscribe(
  //         (data) => {
  //           console.log(data);
  //           alert('Data Updated Successfully');
  //           this._route.navigate(['displayInstituteAdmin']);
  //         },
  //         (error) => console.log(error)
  //       );
  //   },
  //   (error) => console.log(error)
  // );


  ViewInstituteadmin(firstName: String) {
    this._route.navigate(['viewadminprofile', firstName]);

  }


  //delete a data in database

  _deletInstituteAdmin(firstName: string) {
    this._instituteAdminService._deleteInstituteAdminList(firstName).subscribe(
      (data) => {
        location.reload();
        alert('Data Deleted Successfully');
        this._route.navigate(['displayInstituteAdmin']);
      },
      (error) => console.log(error)
    );
  }

  Home() {
    this.location.back();
    // this._route.navigate(['adminmodule/admin']);
  }

  redirectToActivateProfile() {
    this._route.navigate(['displayInstituteAdmin/activate']);
  }
}
