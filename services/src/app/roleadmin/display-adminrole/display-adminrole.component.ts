import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleserviceService } from '../adminroleservice.service';

@Component({
  selector: 'app-display-adminrole',
  templateUrl: './display-adminrole.component.html',
  styleUrls: ['./display-adminrole.component.css']
})
export class DisplayAdminroleComponent {

  _employee: Admin[] = [];
  constructor(private _adminService:AdminroleserviceService,private _route:Router){}

  ngOnInit(): void {
    this._adminService.fetchadminlist().subscribe(
      data => {
        console.log("Response Receved...");
        this._employee=data;
    
      },

      error => console.log("exception")
    )
  }

  addAdmin(){
    this._route.navigate(['/addAdminRole'])
  }

  updateAdminRole(roleName:string){
    console.log("Welcome..")
      this._route.navigate(['/updateAdminRole',roleName])
   
  }

  deletAdminRole(roleName:string){
    this._adminService.deleteAdmin(roleName)
    .subscribe(
      data => {
        alert("Data Deleted...")
        location.reload();
        this._route.navigate(['RoleAdminHome'])
       
      },
      error => console.log(error));

  }


  viewAdminRole(roleName:string){
    console.log("in view mode...");
    this._route.navigate(['/viewAdminData',roleName])

  }


}
