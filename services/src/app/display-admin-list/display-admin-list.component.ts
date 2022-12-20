import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleServiceService } from '../adminrole-service.service';

@Component({
  selector: 'app-display-admin-list',
  templateUrl: './display-admin-list.component.html',
  styleUrls: ['./display-admin-list.component.css']
})
export class DisplayAdminListComponent implements OnInit {
  
  _employee: Admin[] = [];
  constructor(private _adminService:AdminroleServiceService,private _route:Router){}

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
        this._route.navigate([''])
       
      },
      error => console.log(error));

  }


  viewAdminRole(roleName:string){
    console.log("in view mode...");
    this._route.navigate(['/viewAdminData',roleName])

  }


  

}
