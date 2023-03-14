import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/authlogin/auth.service';
import { Authuser } from 'app/authuser/authuser';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';
import { InsertinstituteadminprofileComponent } from '../insertinstituteadminprofile/insertinstituteadminprofile.component';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';
import { InstitutionSeriveService } from '../institution-serive.service';

@Component({
  selector: 'app-viewinstiteadminprofile',
  templateUrl: './viewinstiteadminprofile.component.html',
  styleUrls: ['./viewinstiteadminprofile.component.css']
})
export class ViewinstiteadminprofileComponent {

  authUser = new Authuser();

  _authList: Authuser[] = [];

  userName!: string;
  adminId: any;


  authUserName!: string;
  _instituteadminprofile = new InstituteAdmin();
  constructor(private _route: Router, private _service: InstituteAdminServiceService, private _activatedRoute: ActivatedRoute, private _authservice: AuthuserserviceService) { }
  ngOnInit(): void {

    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)

    this.getInstituteProfileByName();

    //this.getAllAuthUsers();








  }


  getInstituteProfileByName() {

    let firstName = this._activatedRoute.snapshot.params['firstName'];


    this._service._getInstituteAdminList(firstName)
      .subscribe(data => {


        this._authservice.authUserList().subscribe(data1 => {
          this._authList = data1;
          // console.log(data1)


          for (let i = 0; i <= this._authList.length; i++) {

            //console.log(this._authList[i].authUserId);

            if (this._authList[i].authUserId === this._instituteadminprofile.userId) {
              console.log(this._authList[i].authUserId + "Values for authuser_id")
              console.log(this._instituteadminprofile.userId + "authuser_id in instituteadmin profile..")
              console.log(this._instituteadminprofile.userRole);
            }





          }





        });





        console.log(firstName)



        this._instituteadminprofile = data;




      }, error => console.log(error));

  }














  goBack() {
    this._route.navigate(['displayInstituteAdmin/display', this.userName])
  }

}
