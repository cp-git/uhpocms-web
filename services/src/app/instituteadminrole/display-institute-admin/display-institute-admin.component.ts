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

  constructor(private  _instituteAdminService:InstituteAdminServiceService, private _route:Router ){}

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

  _updateInstituteAdmin(firstName:string){
    console.log("Welcome..")
      this._route.navigate(['/updateInstitutionAdmin',firstName])
   
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
