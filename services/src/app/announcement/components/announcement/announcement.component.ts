import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'app/announcement/class/announcement';
import { AnnouncementService } from 'app/announcement/service/announcement.service';

import { Location } from '@angular/common';
import { AuthService } from 'app/authlogin/service/auth.service';
import { Profile } from 'app/profiles/class/profile';
import { CreateAnnouncementComponent } from '../create-announcement/create-announcement.component';
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
  isAutherisedToAdd: boolean = false;
  isAutherisedToDelete: boolean = false;
  forDeleteAnnoucement: boolean = true;
  isAutherisedToSend: boolean = true;
  deleteTableHead: boolean = true;
  profileId: any;
  userId: any;
  userRole: any;

  allData: Profile[] = [];
  //constructor
  constructor(private location: Location, private announcementService: AnnouncementService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute
  ) {
    this.loadAdminInstitutions();
    this.announcement = new Announcement();
    this.currentAnnouncement = new Announcement();
    this.userRole = sessionStorage.getItem('userRole');
    this.userId = sessionStorage.getItem('userId');
    this.profileId = sessionStorage.getItem('profileId');
    //  this.createAnnouncementComponent.isCreateScreen ;
  }

  //ngoninit
  ngOnInit(): void {
    window.scrollTo(0, 0);

    //function to be executed load on page
    this.changeRole(this.profileId, this.userRole);
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
        this.isAutherisedToAdd = false;
        this.forDeleteAnnoucement = false;
        this.getAnnouncements(profileId);
        this.isAutherisedToSend = false;
        break;
      case "teacher":
        // alert(profileId)
        this.isAutherisedToAdd = true;
        this.isAutherisedToDelete = true;
        this.forDeleteAnnoucement = false;
        this.deleteTableHead = false;
        this.getAnnouncements(profileId);
        this.getOutgoingAnnoucement(profileId);
        break;
      case "coadmin":
        this.isAutherisedToAdd = true;
        this.isAutherisedToDelete = true;
        this.forDeleteAnnoucement = true;
        this.getAllAnnouncements();
        this.getOutgoingAnnoucement(profileId);
        break;
      case "admin":
        this.isAutherisedToAdd = true;
        this.forDeleteAnnoucement = true;
        this.isAutherisedToDelete = true;
        this.forDeleteAnnoucement = true;
        this.getAnnouncements(profileId);
        this.getOutgoingAnnoucement(profileId);
        break;
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

    }else{
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
    this.announcementService.deleteAnnouncementById(announcementId).subscribe(
      response => {
        console.log("deleted successfuly");
        this.ngOnInit();
      },
      error => {
        console.log("deleted failed");
      }
    );
  }

  //function to route back
  back() {
    this.location.back();
  }

  sessionData: any;
  data: any;

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