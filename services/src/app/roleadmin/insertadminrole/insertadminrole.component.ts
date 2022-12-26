import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleserviceService } from '../adminroleservice.service';

@Component({
  selector: 'app-insertadminrole',
  templateUrl: './insertadminrole.component.html',
  styleUrls: ['./insertadminrole.component.css']
})
export class InsertadminroleComponent {

  admin=new Admin();

  

  
  
  constructor(private _service:AdminroleserviceService,private _route:Router){}


  
  addrole(){
    this._service.addAdminRole(this.admin).subscribe(
      data=>{
       // console.log(data);
     

      
        
        alert("student added Successfully");
        this._route.navigate(['RoleAdminHome'])
        

      },
      erorr=>alert("Please Select Value in between admin,student,teacher and coadmin")
    )

    

  
  
  }

  


  
  
  goBack(){
    this._route.navigate([''])

  }

}
