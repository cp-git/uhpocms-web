import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleServiceService } from '../adminrole-service.service';

@Component({
  selector: 'app-insert-admin-role',
  templateUrl: './insert-admin-role.component.html',
  styleUrls: ['./insert-admin-role.component.css']
})
export class InsertAdminRoleComponent {

  admin=new Admin();

  _employeeSave:string[] = [];

  
  
  constructor(private _service:AdminroleServiceService,private _route:Router){}


  
  addrole(){
    this._service.addAdminRole(this.admin).subscribe(
      data=>{
       // console.log(data);
     

      
        
        console.log("student added Successfully");
        this._route.navigate([''])
        

      },
      erorr=>alert("Please Select Value in between admin,student,teacher and coadmin")
    )

    

  
  
  }

  


  
  
  goBack(){
    this._route.navigate([''])

  }



}
