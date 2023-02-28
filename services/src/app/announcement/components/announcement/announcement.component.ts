import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'app/announcement/announcement';
import { AnnouncementService } from 'app/announcement/service/announcement.service';
import { AuthService } from 'app/authlogin/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  announcement: Announcement;

  currentAnnouncement: Announcement;
  isAutherisedToAdd: boolean = false;
  profileId: any;
  userRole: any;
  constructor(
    private location: Location,
    private announcementService: AnnouncementService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.announcement = new Announcement();
    this.currentAnnouncement = new Announcement();
  }

  ngOnInit(): void {
    // if (!this.authService.isUserLoggedIn()) {
    //   this.router.navigate(['/login']);
    // } else {

    // }
    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userRole = this.activatedRoute.snapshot.params['role'];
    this.changeRole(this.profileId, this.userRole);
    // this.getAllAnnouncements();
    // this.getAnnouncements(this.profileId, this.userRole);
  }

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
  goBack(): void {
    this.location.back();
  }
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

  viewAnnouncement(announement: Announcement) {
    this.currentAnnouncement = announement;
    this.router.navigate([`/announcement/${this.userRole}/view`, announement.id])
  }

  public deleteAnnouncementByTitle(title: string) {
    this.announcementService.deleteAnnouncement(title).subscribe(
      response => {
        alert("deleted successfuly");
        this.ngOnInit();
      },
      error => {
        alert("deleted failed");
      }
    );
  }

  private createAnnouncement(announcement: Announcement) {
    this.announcementService.insertAnnouncement(announcement).subscribe(
      response => {
        alert("added successfuly");
        this.ngOnInit();
      },
      error => {
        alert("add failed");
      }
    );
  }

  back() {
    this.location.back();
  }


}