import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'app/announcement/announcement';
import { AnnouncementService } from 'app/announcement/service/announcement.service';
import { AuthService } from 'app/authlogin/auth.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  announcement: Announcement;

  constructor(private announcementService: AnnouncementService, private router: Router, private authService: AuthService) {
    this.announcement = new Announcement();
  }

  ngOnInit(): void {
    // if (!this.authService.isUserLoggedIn()) {
    //   this.router.navigate(['/login']);
    // } else {

    // }
    this.getAllAnnouncements();
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


}