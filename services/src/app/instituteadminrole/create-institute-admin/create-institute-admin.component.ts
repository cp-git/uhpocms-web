import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-create-institute-admin',
  templateUrl: './create-institute-admin.component.html',
  styleUrls: ['./create-institute-admin.component.css']
})
export class CreateInstituteAdminComponent {
  _instituteAdmin = new InstituteAdmin();

  constructor(private service:InstituteAdminServiceService,private _route:Router){}

  _addInstituteAdmin(){
    this.service._addInstituteAdminList(this._instituteAdmin).subscribe(
      data=>{
      
        alert("Institute Added Successfully");
        this._route.navigate(['displayInstituteAdmin'])
        

      },
     
    )

    

     


}


goBack(){
  this._route.navigate(['displayInstituteAdmin'])

}

}
