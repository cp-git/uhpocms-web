import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'app/announcement/class/announcement';
import { AnnouncementService } from 'app/announcement/service/announcement.service';
import { Profile } from 'app/profiles/class/profile';
import { ProfileService } from 'app/profiles/services/profile.service';
import { environment } from 'environments/environment.development';
import { Location } from '@angular/common';
import { AuthService } from 'app/authlogin/service/auth.service';

import { CreateAnnouncementComponent } from '../create-announcement/create-announcement.component';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
// import { AuthService } from 'app/authlogin/service/auth.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  // @ViewChild (CreateAnnouncementComponent , {static : false})
  // createAnnouncementComponent!:CreateAnnouncementComponent;

  //variables assignment
  announcements: Announcement[] = [];
  outgoingAnnoucements: Announcement[] = [];
  announcement: Announcement;
  currentAnnouncement: Announcement;
  // isAutherisedToAdd: boolean = false;
  // isAutherisedToDelete: boolean = false;
  // forDeleteAnnoucement: boolean = true;
  // isAutherisedToSend: boolean = true;
  // deleteTableHead: boolean = true;
  profileId: any;
  userId: any;
  userRole: any;
  displayInstituteLogo: any;
  instituteId: any;
  sessionData: any;
  data: any;
  profiles: Profile[] = []; // list of inactive Profile
  profile: Profile;

  allData: Profile[] = [];
  //constructor

  // for user Permissions
  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];
  userModule = userModule;

  constructor(private location: Location, private dialogBoxService: DialogBoxService, private announcementService: AnnouncementService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute, private userPermissionService: AuthUserPermissionService,
    private profileServ: ProfileService) {
    this.profile = new Profile();
    this.displayInstituteLogo = `${environment.adminInstitutionUrl}/institution/getFileById`;

    this.profileId = sessionStorage.getItem("profileId");

    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false
    }

    this.loadAdminInstitutions();
    this.announcement = new Announcement();
    this.currentAnnouncement = new Announcement();
    this.userRole = sessionStorage.getItem('userRole');
    this.userId = sessionStorage.getItem('userId');

    //  this.createAnnouncementComponent.isCreateScreen ;
  }

  //ngoninit
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadProfiles(this.profileId);
    this.loadAndLinkUserPermissions();

    //function to be executed load on page
    this.changeRole(this.profileId, this.userRole);
  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.ANNOUNCEMENT, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(userModule.ANNOUNCEMENT, this.userAndRolePermissions, this.buttonsArray);
  }

  //function to get announcements by profile id
  private getAnnouncements(profileId: number) {
    this.announcementService.fetchAnnouncementByProfileId(profileId).subscribe(
      response => {
        this.announcements = response;
      },
      error => {
        console.log("Not able to fetch record");
      }
    );
  }

  //function to change user role 
  private changeRole(profileId: number, userRole: string) {
    switch (userRole) {
      case "student":
        // this.buttonsArray.showAddButton = false;
        // this.forDeleteAnnoucement = false;
        this.getAnnouncements(profileId);
        this.getOutgoingAnnoucement(profileId);
        // this.isAutherisedToSend = false;
        break;
      case "teacher":
        // alert(profileId)
        // this.isAutherisedToAdd = true;
        // this.isAutherisedToDelete = true;
        // this.forDeleteAnnoucement = false;
        // this.deleteTableHead = false;
        this.getAnnouncements(profileId);
        this.getOutgoingAnnoucement(profileId);
        break;
      case "coadmin":
        // this.isAutherisedToAdd = true;
        // this.isAutherisedToDelete = true;
        // this.forDeleteAnnoucement = true;
        this.getAnnouncements(profileId);
        this.getOutgoingAnnoucement(profileId);
        break;
      case "admin":
        // this.isAutherisedToAdd = true;
        // this.forDeleteAnnoucement = true;
        // this.isAutherisedToDelete = true;
        // this.forDeleteAnnoucement = true;
        this.getAnnouncements(profileId);
        this.getOutgoingAnnoucement(profileId);
        break;
    }

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
          console.log(this.profile.firstName, this.profile.lastName, this.profile.fullName, "  + ++++ + + ", this.instituteId);
          this.instituteId = this.data[i].institutionId;


          //  alert(JSON.stringify(this.profileInstituteId));
          break; // Assuming the profileId is unique, exit the loop after finding the matching profile
        }
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  //function to route back to page
  goBack(): void {
    this.location.back();

  }

  //function to get all announcements
  private getAllAnnouncements() {
    this.announcementService.fetchAllAnnouncements().subscribe(
      response => {
        this.announcements = response;
        console.log(this.announcements);

      },
      error => {
        // console.log("Not able to fetch record");
      }
    );
  }

  //function to get all announcements
  private getOutgoingAnnoucement(profileId: number) {
    this.announcementService.getAnnouncementBySendBy(profileId).subscribe(
      response => {
        this.outgoingAnnoucements = response;
        console.log(this.outgoingAnnoucements);

      },
      error => {
        // console.log("Not able to fetch record");
      }
    );
  }

  //function to view all announcements
  isViewSent: boolean = false;
  viewAnnouncement(announement: Announcement, screen: string = '') {
    this.isViewSent = false;
    this.announcementService.selectedAnnouncement = announement;

    if (screen === 'sent') {
      this.isViewSent = true;
      this.router.navigate([`/announcement/${this.userRole}/views`, announement.id])

    } else {
      this.router.navigate([`/announcement/${this.userRole}/viewr`, announement.id])

    }
    // this.currentAnnouncement = announement;
  }

  //function to view all announcements
  viewOneAnnouncement(announement: Announcement) {
    // this.currentAnnouncement = announement;
    this.announcementService.selectedAnnouncement = announement;
    //this.router.navigate([`/announcement/${this.userRole}/view`, announement.id])
  }

  //function to delete announcemnet by announcement Id
  public deleteAnnouncementById(announcementId: number) {
    this.dialogBoxService.open('Are you sure you want to delete this Announcement ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        this.announcementService.deleteAnnouncementById(announcementId).subscribe(
          response => {
            this.dialogBoxService.open('Announcement deleted successfully', 'information');
            this.ngOnInit();
          },
          (error) => {
            this.dialogBoxService.open('Announcement deletion Failed', 'warning');
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  //function to route back
  back() {
    this.location.back();
  }



  private loadAdminInstitutions() {
    try {
      this.sessionData = sessionStorage.getItem('instituteprofile');
      // console.log(this.sessionData);
      this.data = JSON.parse(this.sessionData);
      for (var inst in this.data) {
        this.allData.push(this.data[inst]);
      }
    }
    catch (err) {
      console.log("Error", err)
    }
  }





}