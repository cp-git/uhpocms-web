import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-update-institute-admin',
  templateUrl: './update-institute-admin.component.html',
  styleUrls: ['./update-institute-admin.component.css']
})
export class UpdateInstituteAdminComponent {

  firstName!: string;
  _instituteAdmin:InstituteAdmin = new InstituteAdmin();
  constructor(private _service:InstituteAdminServiceService,private _activatedRoute:ActivatedRoute,private _route:Router){}

  ngOnInit(): void {
    this.firstName = this._activatedRoute.snapshot.params['firstName'];
   console.log(this.firstName);

   this._service._getInstituteAdminList(this.firstName)
   .subscribe((data: any) => {
     //console.log(data)
     this._instituteAdmin = data;
     console.log(this._instituteAdmin)
   }, error => console.log(error));
 }

 updateadmin() {
  this._service._updateInstituteAdminList(this.firstName,this._instituteAdmin).subscribe(data => {
    //console.log(data)
    alert("Data is Updated..")
    this._route.navigate(['displayInstituteAdmin'])
    
  }, error => console.log(error));
}

goBack(){
  this._route.navigate(['displayInstituteAdmin'])
}

}
