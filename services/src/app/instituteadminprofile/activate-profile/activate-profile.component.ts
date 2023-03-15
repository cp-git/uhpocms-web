import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthuserserviceService } from 'app/authuser/service/authuserservice.service';
import { AdminInstitution } from '../admin-institution';
import { InstituteAdmin } from '../institute-admin';
import { InstituteAdminServiceService } from '../institute-admin-service.service';

@Component({
  selector: 'app-activate-profile',
  templateUrl: './activate-profile.component.html',
  styleUrls: ['./activate-profile.component.css', '../../app.component.css']
})
export class ActivateProfileComponent implements OnInit {

  _instituteAdminArray: InstituteAdmin[] = [];
  adminInstitutions: AdminInstitution[] = [];
  sessionData: any;
  data: any;

  userName!: string;
  adminId: any;
  constructor(private _instituteAdminService: InstituteAdminServiceService,
    private _router: Router, private authUserService: AuthuserserviceService, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)
    this._getAllInactiveProfiles();
    this._getAllAdminInstitutions();
  }

  _getAllInactiveProfiles() {
    this._instituteAdminService.getAllDeactivatedInstituteProfiles().subscribe(
      response => {
        this._instituteAdminArray = response;
      },
      error => {
        alert("Failed to fetch data")
      }
    );

  }

  _getAllAdminInstitutions() {
    this.sessionData = sessionStorage.getItem('admininstitution');

    this.data = JSON.parse(this.sessionData);
    for (var inst in this.data) {
      this.adminInstitutions.push(this.data[inst]);
    }
  }

  Home() {
    this._router.navigate(['displayInstituteAdmin/display', this.userName])
  }

  activateProfile(profile: InstituteAdmin) {
    if (this.isObjectComplete(profile)) {
      this._instituteAdminService.activateInstituteProfile(profile.adminId).subscribe(
        response => {
          this.authUserService.activateAuthUserById(profile.userId).subscribe(
            response => {
              alert('Profile activated successfully');

            },
            error => {
              alert("Failed to add profile");
            }
          );
          this.ngOnInit();
        },
        error => {
          alert("Profile activation failed");
        }
      );
    } else {
      alert("profile is incomplete to activate!");
    }

  }

  isObjectComplete(profile: any): boolean {
    for (const key in profile) {
      if (profile.hasOwnProperty(key) && key !== 'activeUser') {
        if (profile[key] == null || profile[key] === undefined || profile[key] === '') {
          return false;
        }
      }
    }

    return true;
  }



}
