import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-view-institute-admin',
  templateUrl: './view-institute-admin.component.html',
  styleUrls: ['./view-institute-admin.component.css']
})
export class ViewInstituteAdminComponent {
  _instituteAdmin = new InstituteAdmin();
constructor(private _route: Router, private _service: InstituteAdminServiceService, private _activatedRoute: ActivatedRoute) { }
ngOnInit(): void {
  let firstName = this._activatedRoute.snapshot.params['firstName'];
  this._service._getInstituteAdminList(firstName)
  .subscribe(data => {
    console.log(data)
    this._instituteAdmin = data;
  }, error => console.log(error));

}



goBack(){
  this._route.navigate(['displayInstituteAdmin'])
}

}
