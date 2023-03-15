import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-updateinstituteadminprofile',
  templateUrl: './updateinstituteadminprofile.component.html',
  styleUrls: ['./updateinstituteadminprofile.component.css']
})
export class UpdateinstituteadminprofileComponent {
  _instituteAdmin = new InstituteAdmin();
  firstName!: string;

  userName!: string;
  adminId: any;

  constructor(private _service: InstituteAdminServiceService, private _activatedRoute: ActivatedRoute, private _route: Router) { }

  ngOnInit(): void {

    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)

    this.firstName = this._activatedRoute.snapshot.params['firstName'];
    console.log(this.firstName);



    this._service._getInstituteAdminList(this.firstName)
      .subscribe(data => {
        //console.log(data)
        this._instituteAdmin = data;
        console.log(this._instituteAdmin)
      }, error => console.log(error));
  }


  updateadmin() {
    this._service.saveOrUpdateProfile(this._instituteAdmin.userId, this._instituteAdmin).subscribe(data => {
      //console.log(data)
      console.log(this._instituteAdmin)
      this._route.navigate(['/displayInstituteAdmin/display', this.userName])

    }, error => console.log(error));
  }

  back() {
    this._route.navigate(['displayInstituteAdmin/display', this.userName])

  }
}
