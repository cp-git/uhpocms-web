import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { environment } from 'environments/environment.development';
@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.css']
})
export class ModuleHeaderComponent {

  @Input() moduleName: string = 'Space For Module Name';
  @Input() buttons: { showAddButton: boolean, showActivateButton: boolean } = { showAddButton: false, showActivateButton: false }
  @Input() titleWithUserRole: boolean = false;

  @Output() backButtonClicked = new EventEmitter();
  @Output() addButtonClicked = new EventEmitter();
  @Output() activateButtonClicked = new EventEmitter();

  displayInstituteLogo: any;
  instituteId: any;
  sessionData: any;
  data: any;
  profileId: any
  profiles: Profile[] = []; // list of inactive Profile
  profile: Profile;

  userRole: any;
  constructor(private profileServ: ProfileService) {
    this.profile = new Profile();
    this.displayInstituteLogo = `${environment.adminInstitutionUrl}/institution/getFileById`;

    this.profileId = sessionStorage.getItem("profileId");
    this.userRole = sessionStorage.getItem('userRole');
  }

  ngOnInit(): void {
    this.loadProfiles(this.profileId);
  }

  back() {
    this.backButtonClicked.emit();
  }

  // for navigating to add screen
  onAddClick() {
    this.addButtonClicked.emit();
  }

  // for navigating to activate screen
  onActivateClick() {
    this.activateButtonClicked.emit();
  }

  loadProfiles(profileId: number) {
    // alert(studentId);
    try {
      this.sessionData = sessionStorage.getItem('instituteprofile');
      //alert(JSON.stringify(this.sessionData));
      this.data = JSON.parse(this.sessionData);

      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].adminId == this.profileId) {
          this.profile = this.data;
          this.instituteId = this.data[i].institutionId;
          //  alert(this.studentName);

          this.instituteId = this.data[i].institutionId;


          //  alert(JSON.stringify(this.profileInstituteId));
          break; // Assuming the profileId is unique, exit the loop after finding the matching profile
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

}
