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

  _instituteAdmin : InstituteAdmin[] = [];

  _instituteAdminObject!: new () => InstituteAdmin; ;

  constructor(private  _instituteAdminService:InstituteAdminServiceService, private _route:Router){}

  ngOnInit() : void
  {
    this._instituteAdminService._getAllInstituteAdminList().subscribe(
     data => {
      this._instituteAdmin = data;
     }
    
    )

  }


  _addInstituteAdmin()
  {
    this._route.navigate(['/addInstitutionAdmin'])
  }

  _updateInstituteAdmin(firstName:string,_instituteAdmin:InstituteAdmin){
 
    this._instituteAdminService._getInstituteAdminList(firstName)
    .subscribe(data => {
      console.log(data)
      this._instituteAdminObject = data;

      this._instituteAdminService._updateInstituteAdminList(firstName,_instituteAdmin).subscribe(data => {
        console.log(data)
        alert("Data is Updated..")
        this._route.navigate(['displayInstituteAdmin'])

        
      }, error => console.log(error));

    }, error => console.log(error));

  }

 

  _viewInstituteAdmin(firstName:string){
    console.log("in view mode...");
    this._route.navigate(['/viewInstitutionAdmin',firstName])

  }


  _deletInstituteAdmin(firstName:string){
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
