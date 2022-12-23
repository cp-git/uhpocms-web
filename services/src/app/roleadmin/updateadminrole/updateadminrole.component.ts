import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminroleserviceService } from '../adminroleservice.service';

@Component({
  selector: 'app-updateadminrole',
  templateUrl: './updateadminrole.component.html',
  styleUrls: ['./updateadminrole.component.css']
})
export class UpdateadminroleComponent {
  roleName!: string;
  admin:Admin=new Admin();
  constructor(private _service:AdminroleserviceService,private _activatedRoute:ActivatedRoute,private _route:Router){}

  ngOnInit(): void {
     this.roleName = this._activatedRoute.snapshot.params['roleName'];
    console.log(this.roleName);

    this._service.getAdminlist(this.roleName)
    .subscribe(data => {
      //console.log(data)
      this.admin = data;
      
    }, error => console.log(error));
  }


  updateadmin() {
    this._service.updateadminlist(this.roleName,this.admin).subscribe(data => {
      //console.log(data)
      alert("Data Updated...")
      this._route.navigate(['RoleAdminHome'])
      
    }, error => console.log(error));
  }


  goBack(){
    this._route.navigate([''])
  }

}
