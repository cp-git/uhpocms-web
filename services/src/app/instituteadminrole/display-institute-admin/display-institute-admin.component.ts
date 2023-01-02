import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-display-institute-admin',
  templateUrl: './display-institute-admin.component.html',
  styleUrls: ['./display-institute-admin.component.css']
})
export class DisplayInstituteAdminComponent {

  _instituteAdmin2: InstituteAdmin[] = [];

  _instituteAdminArray: InstituteAdmin[] = [];

  _instituteAdminObj = new InstituteAdmin();

  _instituteAdmin = new InstituteAdmin();

  _instituteAdminObjCopy: InstituteAdmin[] = [];

  // for extra row when there is no data
  isHidden: boolean = true;



  constructor(private _instituteAdminService: InstituteAdminServiceService, private _route: Router) {
    
  }

  ngOnInit(): void {
    this._getAllList();
  }

//get all data frmo databasea
  _getAllList() {
    this._instituteAdminService._getAllInstituteAdminList().subscribe(
      data => {
        this._instituteAdminArray = data;
        console.log(data);
        if (this._instituteAdminArray.length > 0) {
          this.isHidden = false;
        }
        //  cloning array from departments to backupDept
        // this._instituteAdminArray.forEach((institute: any) => {
        // this._instituteAdminObjCopy.push(Object.assign({}, institute))
      })

    //  if (this._instituteAdminArray.length > 0) {
    //     this.isHidden = true;
    //  }
    // },
    //  )
  }


//insert a data in database
  _addInstituteAdmin(_instituteAdminObject: InstituteAdmin) {
    let _addInstituteObj = new InstituteAdmin();
    _addInstituteObj.activeUser = _instituteAdminObject.activeUser;
    _addInstituteObj.adminAddress1 = _instituteAdminObject.adminAddress1;
    _addInstituteObj.adminAddress2 = _instituteAdminObject.adminAddress2;
    _addInstituteObj.adminCity = _instituteAdminObject.adminCity;
    _addInstituteObj.adminDepartment = _instituteAdminObject.adminDepartment;
    _addInstituteObj.adminEmail = _instituteAdminObject.adminEmail;
    _addInstituteObj.adminGender = _instituteAdminObject.adminGender;
    _addInstituteObj.institutionId = _instituteAdminObject.institutionId;
    _addInstituteObj.adminState = _instituteAdminObject.adminState;
    _addInstituteObj.adminZip = _instituteAdminObject.adminZip;
    _addInstituteObj.createdBy = _instituteAdminObject.createdBy;
    _addInstituteObj.dob = _instituteAdminObject.dob;
    _addInstituteObj.firstName = _instituteAdminObject.firstName;
    _addInstituteObj.lastName = _instituteAdminObject.lastName;
    _addInstituteObj.mobilePhone = _instituteAdminObject.mobilePhone;
    _addInstituteObj.modifiedBy = _instituteAdminObject.modifiedBy;
    _addInstituteObj.profilePics = _instituteAdminObject.profilePics;
    _addInstituteObj.userId = _instituteAdminObject.userId;
    _addInstituteObj.userRole = _instituteAdminObject.userRole;


    console.log(_addInstituteObj)
    this._instituteAdminService._addInstituteAdminList(_addInstituteObj).subscribe(
      data => {
        console.log(data);
        // _addInstituteObj = data;
        // this._instituteAdmin2[this._instituteAdmin2.indexOf(_instituteAdminObject)] = this._instituteAdminObjCopy[this._instituteAdminObjCopy.findIndex(data => data.firstName == _instituteAdminObject.firstName)];
        // this._instituteAdmin2.push(_addInstituteObj);
        alert("Institute Added Successfully");
        location.reload();

        // this._route.navigate(['displayInstituteAdmin'])


      },

    )
  }

//update a data in database
  _updateInstituteAdmin(firstName: string, _instituteAdmin: InstituteAdmin) {

    this._instituteAdminService._getInstituteAdminList(firstName)
      .subscribe(data => {
        console.log(data)
        this._instituteAdminObj = data;

        this._instituteAdminService._updateInstituteAdminList(firstName, _instituteAdmin).subscribe(data => {
          console.log(data)
          alert("Data is Updated..")
          this._route.navigate(['displayInstituteAdmin'])


        }, error => console.log(error));

      }, error => console.log(error));

  }



//delete a data in database

  _deletInstituteAdmin(firstName: string) {
    this._instituteAdminService._deleteInstituteAdminList(firstName)
      .subscribe(
        data => {
          location.reload();
          alert("Data Deleted...")
          this._route.navigate(['displayInstituteAdmin'])

        },
        error => console.log(error));

  }

}
