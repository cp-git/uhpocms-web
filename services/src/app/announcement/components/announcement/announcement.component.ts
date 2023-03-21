import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'app/announcement/class/announcement';
import { AnnouncementService } from 'app/announcement/service/announcement.service';

import { Location } from '@angular/common';
import { AuthService } from 'app/authlogin/service/auth.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  //variables assignment
  announcements: Announcement[] = [];
  announcement: Announcement;
  currentAnnouncement: Announcement;
  isAutherisedToAdd: boolean = false;
  profileId: any;
  userRole: any;

  //constructor
  constructor(private location: Location, private announcementService: AnnouncementService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute
  ) {
    this.announcement = new Announcement();
    this.currentAnnouncement = new Announcement();
  }

  //ngoninit
  ngOnInit(): void {

    //code to get data fromm urls
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userRole = this.activatedRoute.snapshot.params['role'];

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
        alert("Not able to fetch record");
      }
    );
  }

  //function to change user role 
  private changeRole(profileId: number, userRole: string) {
    switch (userRole) {
      case "student":
        this.isAutherisedToAdd = false;
        this.getAnnouncements(profileId);
        break;
      case "teacher":
        this.isAutherisedToAdd = true;
        this.getAnnouncements(profileId);
        break;
      case "coadmin":
        this.isAutherisedToAdd = true;
        this.getAllAnnouncements();
        break;
      case "admin":
        this.isAutherisedToAdd = true;
        this.getAllAnnouncements();
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
      },
      error => {
        // alert("Not able to fetch record");
      }
    );
  }

  //function to view all announcements
  viewAnnouncement(announement: Announcement) {
    // this.currentAnnouncement = announement;
    this.announcementService.selectedAnnouncement = announement;
    this.router.navigate([`/announcement/${this.userRole}/view`, announement.id])
  }

  //function to delete announcemnet by announcement Id
  public deleteAnnouncementById(announcementId: number) {
    this.announcementService.deleteAnnouncementById(announcementId).subscribe(
      response => {
        alert("deleted successfuly");
        this.ngOnInit();
      },
      error => {
        alert("deleted failed");
      }
    );
  }

  //function to route back
  back() {
    this.location.back();
  }


}