import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private _instituteAdminService: InstituteAdminServiceService,
    private _router: Router) {

  }

  ngOnInit(): void {
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
    this._router.navigate(['displayInstituteAdmin'])
  }

  activateProfile(institutionId: number) {
    this._instituteAdminService.activateInstituteProfile(institutionId).subscribe(
      response => {
        alert("Profile activated");
        this.ngOnInit();
      },
      error => {
        alert("Profile activation failed");
      }
    );
  }


}
