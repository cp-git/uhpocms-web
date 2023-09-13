
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Announcement } from 'app/announcement/class/announcement';
import { AnnouncementTo } from 'app/announcement/class/announcement-to';
import { AnnouncementService } from 'app/announcement/service/announcement.service';
import { Profile } from 'app/profiles/class/profile';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  @ViewChild('closeModalBtn', { static: true })     // for close modal when sent announcements
  closeModalBtn!: ElementRef<any>;
  @ViewChild('modal', { static: true })
  modal!: ElementRef<any>;

  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  private announcementId: number;     // announcement id to add in to_list table
  private instituteAdmins: Profile[] = [];     // data of institute admin profile for dropdown
  private sessionData: any;   // for session data
  private data: any;
  private students: Profile[] = [];
  private admins: Profile[] = [];
  private coadmins: Profile[] = [];
  private teachers: Profile[] = [];
  private otherRoles: Profile[] = [];
  public filterRoles: Profile[] = [];

  public announcement: Announcement;     // announcement for sending
  public profileIDs: number[] = [];    // for capturing ids of profiles to whom we are sending
  public searchValue: any;     // for filter list of profiles in tropdown
  public filteredList: any = [];
  public selectedRole: any;    // array of student, admin, coadmin, teachers ids
  public users = new Map();
  userId: any;
  profileId: any;
  loginId: any;
  userRole: any;
  public currentAnnouncementProfileIds: AnnouncementTo[] = [];

  public isCreateScreen: boolean = true;

  isReceived: boolean = false;
  isSent: Boolean = false;
  constructor(private location: Location, private announcementService: AnnouncementService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.announcement = new Announcement();
    this.announcementId = 0;
    this.selectedRole = "All";
    // const teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = sessionStorage.getItem('userId');
    this.profileId = sessionStorage.getItem('profileId');
    this.loginId = sessionStorage.getItem('profileId');
    this.userRole = sessionStorage.getItem('userRole');

    const currentUrl = this.router.url;
    this.isReceived = false;
    this.isSent = false;
    if (currentUrl.includes('/viewr')) {
      this.isReceived = true;

    } else {
      this.isSent = true;

    }
  }


  ////////////////////////////////////////  Load data on page ////////////////////////////////////////
  ngOnInit(): void {


    // getting institution profile data from session 
    this.announcementId = this.activatedRoute.snapshot.params['id'];

    if (this.announcementId > 0) {
      this.announcement = this.announcementService.selectedAnnouncement;
      this.announcementService.fetchProfileIdsByAnnouncementId(this.announcementId).subscribe(
        response => {
          this.profileIDs = [];
          response.forEach(profileId => {
            this.profileIDs.push(profileId.profileId);
          });

        },
        error => {
          this.currentAnnouncementProfileIds = [];

        }
      );
      this.isCreateScreen = false;
    } else {
      this.isCreateScreen = true;
    }



    switch (this.userRole) {
      case 'admin':
        // loading all user profiles
        this.loadInstitutionProfile();
        break;

      case 'teacher':
        // loading all user profiles
        this.studentsAssignedToTeacherCourse(this.profileId);
        break;

      case 'student':
        this.getEnrolledProfilesOfCourseByOneStudentId(this.profileId);
        break;
    }




    // sorting profiles as per role


  }
  ////////////////////////////////////  GET STUDENT ASSIGN TO TEACHER COURSE ///////////////////////////////
  //function to get all announcements
  private studentsAssignedToTeacherCourse(profileId: number) {
    this.announcementService.getStudentsAssignedToTeacher(profileId).subscribe(
      response => {
        this.instituteAdmins = response;

        this.sortProfiles();
      },
      error => {
        // console.log("Not able to fetch record");
      }
    );
  }

  //////////////////////////////////  GET ENROLLED PROFILE OF COURSE BY ONE STUDENT ID //////////////////////////////////
  private getEnrolledProfilesOfCourseByOneStudentId(profileId: number) {
    this.announcementService.getEnrolledProfilesOfCourseByOneStudentId(profileId).subscribe(
      response => {
        this.instituteAdmins = response;

        this.sortProfiles();
      },
      error => {
        // console.log("Not able to fetch record");
      }
    );
  }

  ngAfterViewInit() {
    // subscribe to NavigationEnd event

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // call ngOnInit when NavigationEnd event fires
      this.ngOnInit();
    });
  }


  //////////////////////////////////  LOAD THE PROFILE DATA FROM SESSION STORAGE /////////////////////////////
  // getting institution profile data from session 
  private loadInstitutionProfile() {
    this.instituteAdmins = [];
    this.sessionData = sessionStorage.getItem("instituteprofile");
    this.data = JSON.parse(this.sessionData);

    for (var profile in this.data) {
      this.instituteAdmins.push(this.data[profile]);
    }
    this.sortProfiles();

  }



  // for select value in dropdown of profile email
  onChange(id: number, event: any) {
    if (event.target.checked) {
      this.profileIDs.push(id);
    } else {
      this.profileIDs = this.profileIDs.filter(item => item !== id);
    }
    // Remove profileId from profileIDs array
    const index = this.profileIDs.indexOf(parseInt(this.profileId));
    if (index !== -1) {
      this.profileIDs.splice(index, 1);
    }
  }




  ///////////////////////////////////////// SEND ANNOUNCEMENT     ///////////////////////////////////
  // sending announcements to users
  sendAnnouncements(announcement: Announcement) {
    // this.insertAnnouncement(announcement);
    this.announcement.announcementSendby = this.profileId;
    //alert(this.profileId);
    if (this.validate(announcement) && this.profileIDs.length > 0) {
      this.insertAnnouncement(announcement);
    } else {

    }

  }

  validate(object: any): boolean {
    if (Object.keys(object).length === 0) {
      return false;
    }
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];
        if (value === undefined || value === null || value === '') {
          return false;
        }
      }
    }
    return true;
  }

  ////////////////////////////////////  CREATE THE ANNOUNCEMENT /////////////////////////////////////////
  private insertAnnouncement(announcement: Announcement) {
    this.announcementService.insertAnnouncement(announcement).subscribe(
      response => {

        // this.router.navigate(['announcement']);
        this.announcementId = response.id;

        // sending announcements to users
        this.sendAnnouncementsToProfileIDs()
      },
      error => {
        console.log("Subject should not be repeat");
      }
    );
  }

  /////////////////////////////////////////////////// SEND ANNOUNCEMENT TO PROFILE ID'S ////////////////////////////////////////
  private sendAnnouncementsToProfileIDs() {
    this.announcementService.sendAnnouncementsToProfileIDs(this.announcementId, this.profileIDs).subscribe(
      success => {


        // for after successfully sending announcement modal is close 
        this.closeModalBtn.nativeElement.click();

        location.reload();
      },
      failure => {
        console.log("Failed to sent");
      }
    );
  }


  // for sorting or filtering profile data showing in dropdown to whom we are sending 
  sortEmails(event: any) {
    let searchString = event.toLowerCase();
    if (!searchString) {

      // all data in filter list
      this.filterRoles = this.instituteAdmins.slice();
      return;
    } else {

      // sorting by text entered in search box
      this.filterRoles = this.instituteAdmins.filter(
        (profile) => profile.adminEmail.toLowerCase().indexOf(searchString) > -1
      );
    }

  }

  private sortProfiles() {
    // for separting orignal and filter list
    this.filteredList = this.instituteAdmins;
    this.filterRoles = this.instituteAdmins;
    this.admins = [];
    this.coadmins = [];
    this.students = [];
    this.teachers = [];
    this.otherRoles = [];
    this.instituteAdmins.forEach(profile => {

      switch (profile.userRole) {
        case 'admin':
          this.admins.push(profile);
          break;
        case 'coadmin':
          this.coadmins.push(profile);
          break;
        case 'student':
          this.students.push(profile);
          break;
        case 'teacher':
          this.teachers.push(profile);
          break;
        default:
          this.otherRoles.push(profile);
          break;

      }
    });


    this.users.set("Students", this.students);
    this.users.set("Teachers", this.teachers);
    this.users.set("Admins", this.admins);
    this.users.set("CoAdmins", this.coadmins);
    this.users.set("OtherRoles", this.otherRoles);
  }


  onRoleChange() {
    this.modal.nativeElement.style.height = '600px';
    switch (this.selectedRole) {
      case 'All':
        this.filterRoles = this.filteredList;
        break;
      case 'Teachers':
        this.filterRoles = this.teachers;
        break;
      case 'Students':
        this.filterRoles = this.students;
        break;
      case 'Admins':
        this.filterRoles = this.admins;
        break;
      case 'CoAdmins':
        this.filterRoles = this.coadmins;
        break;
      default:
        this.filterRoles = this.otherRoles;
        break;

    }
  }

  selectAll(event?: any) {
    if (event.target.checked) {
      this.filterRoles.forEach(profile => this.profileIDs.push(profile.adminId));
    } else {
      this.filterRoles.forEach(profile => {
        this.profileIDs = this.profileIDs.filter(item => item !== profile.adminId);
      });
    }

    // Remove profileId from profileIDs array
    const index = this.profileIDs.indexOf(parseInt(this.profileId));
    if (index !== -1) {
      this.profileIDs.splice(index, 1);
    }
  }

  isFormComplete(): boolean {
    // Check if all required fields are filled in
    if (this.announcement.announcementTitle && this.announcement.announcementMessage && this.profileIDs.length > 0) {
      return true;
    }
    return false;
  }
  announcementPage() {
    this.location.back();
  }
}