import { Component } from '@angular/core';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  announcementTo: [] = [];
  instituteAdmins: InstituteAdmin[] = [];
  sessionData: any;
  data: any;

  constructor() {

  }

  ngOnInit(): void {

    this.loadInstitutionProfile();
    console.log(JSON.stringify(this.instituteAdmins));

  }

  private loadInstitutionProfile() {
    this.sessionData = sessionStorage.getItem("instituteprofile");

    this.data = JSON.parse(this.sessionData);

    for (var profile in this.data) {
      this.instituteAdmins.push(this.data[profile]);
    }

  }

}
