
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'app/announcement/announcement';
import { AnnouncementService } from 'app/announcement/service/announcement.service';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  // for close modal when sent announcements
  @ViewChild('closeModalBtn', { static: true })
  closeModalBtn!: ElementRef<any>;

  // data of institute admin profile for dropdown
  instituteAdmins: InstituteAdmin[] = [];

  // announcement for sending
  announcement: Announcement;

  // for session data
  sessionData: any;
  data: any;

  // for capturing ids of profiles
  profileIDs: number[] = [];

  //public selectedValue: any;

  // for filter list of profiles in tropdown
  public searchValue: any;
  public filteredList: any = [];

  // announcement id to add in to_list table
  private announcementId: number;


  // array of student, admin, coadmin, teachers ids
  selectedRole: any;

  users: Array<any> = [];
  public students: InstituteAdmin[] = [];
  public admins: InstituteAdmin[] = [];
  public coadmins: InstituteAdmin[] = [];
  public teachers: InstituteAdmin[] = [];
  public otherRoles: InstituteAdmin[] = [];
  public filterRoles: InstituteAdmin[] = [];

  constructor(private announcementService: AnnouncementService, private router: Router) {
    this.announcement = new Announcement();
    this.announcementId = 0;

  }

  ngOnInit(): void {

    // getting institution profile data from session 
    this.loadInstitutionProfile();
    // console.log(JSON.stringify(this.instituteAdmins));

    // for separting orignal and filter list
    this.filteredList = this.instituteAdmins;

    this.sortProfiles();
  }

  // getting institution profile data from session 
  private loadInstitutionProfile() {
    this.sessionData = sessionStorage.getItem("instituteprofile");
    this.data = JSON.parse(this.sessionData);

    for (var profile in this.data) {
      this.instituteAdmins.push(this.data[profile]);
    }
  }

  // for select value in dropdown of profile email
  onChange(id: number, event: any) {
    if (event.target.checked) {
      this.profileIDs.push(id);
    } else {
      this.profileIDs = this.profileIDs.filter(item => item !== id);
    }
  }

  // sending announcements to users
  sendAnnouncements(announcement: Announcement) {
    this.insertAnnouncement(announcement);
  }

  // adding announement data in table
  private insertAnnouncement(announcement: Announcement) {
    this.announcementService.insertAnnouncement(announcement).subscribe(
      response => {

        // this.router.navigate(['announcement']);
        this.announcementId = response.id;

        // sending announcements to users
        this.sendAnnouncementsToProfileIDs()
      },
      error => {
        alert("Subject should not be repeat");
      }
    );
  }

  // sending announcements to users
  private sendAnnouncementsToProfileIDs() {
    this.announcementService.sendAnnouncementsToProfileIDs(this.announcementId, this.profileIDs).subscribe(
      success => {
        alert("Announcement sent successfully")

        // for after successfully sending announcement modal is close 
        this.closeModalBtn.nativeElement.click();

        location.reload();
      },
      failure => {
        alert("Failed to sent");
      }
    );
  }


  // for sorting or filtering profile data showing in dropdown to whom we are sending 
  sortEmails(event: any) {
    let searchString = event.toLowerCase();
    if (!searchString) {

      // all data in filter list
      this.filteredList = this.instituteAdmins.slice();
      return;
    } else {

      // sorting by text entered in search box
      this.filteredList = this.instituteAdmins.filter(
        (profile) => profile.adminEmail.toLowerCase().indexOf(searchString) > -1
      );
    }

  }

  private sortProfiles() {

    this.instituteAdmins.forEach(profile => {
      // alert(profile.userRole)
      switch (profile.userRole) {
        case 'Admin':
          this.admins.push(profile);
          break;
        case 'CoAdmin':
          this.coadmins.push(profile);
          break;
        case 'Student':
          this.students.push(profile);
          break;
        case 'Teacher':
          this.teachers.push(profile);
          break;
        default:
          this.otherRoles.push(profile);
          break;

      }
    });
    this.users.push("students");
    this.users.push("teachers");
    this.users.push("admins");
    this.users.push("coadmins");
    this.users.push("otherRoles");
  }


  onRoleChange() {
    switch (this.selectedRole) {
      case 'Teachers':
        this.filterRoles = this.teachers;
        break;
      case 'Students':
        this.filterRoles = this.students;
        break;
      case 'Admin':
        this.filterRoles = this.admins;
        break;
      case 'CoAdmin':
        this.filterRoles = this.coadmins;
        break;
      default:
        this.filterRoles = this.otherRoles;
        break;

    }
  }
}
