import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Email } from 'app/email/class/email';

import { EmailAllColumn, EmailColumn } from 'app/email/column-names/email-column';
import { EmailService } from 'app/email/service/email.service';
import { ProfileService } from 'app/profiles/services/profile.service';
import { Profile } from 'app/profiles/profile';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {

  // title heading
  moduleName: string = "Email's Administration";

  // for scren view
  viewUpdate: boolean = false;
  viewAdd: boolean = false;
  viewAll: boolean = true;
  viewOne: boolean = false;
  viewActivate: boolean = false;

  columnNames: any; // header for minimum visible column data
  allColumnNames: any; // header for all visible column data

  // To be assigned based on the module
  readonly primaryIdColumnName: string = 'emailId';

  allData: Email[] = []; // list of active Emails
  allInActiveData: Email[] = []; // list of inactive Email

  emptyEmail: Email;  // empty Email
  currentData!: Email;  // for update and view, to show existing data

  profiles: Profile[] = [];
  constructor(
    private location: Location,
    private service: EmailService,
    private profileService: ProfileService
  ) {
    // assigng Columns
    this.columnNames = EmailColumn;
    this.allColumnNames = EmailAllColumn;

    // creating empty object
    this.emptyEmail = new Email();

    this.getAllAdminProfiles();
  }

  ngOnInit(): void {
    this.getAllEmails();
    // this.getInActiveEmails();

  }

  // back button functionality
  back() {
    if (this.viewAll == false) {
      this.viewAll = true;
      this.viewOne = false;
      this.viewAdd = false;
      this.viewUpdate = false;
      // this.viewActivate = false;
    } else {
      this.location.back();
    }
  }

  // for navigating to add screen
  onAddClick() {
    this.viewAll = false;
    this.viewAdd = true;
  }

  // for navigating to activate screen
  onActivateClick() {
    this.viewAll = true;
    // this.viewActivate = true;
  }

  // For navigate to view screen with data
  // function will call when child view button is clicked 
  onChildViewClick(objectReceived: any): void {

    // hiding view of all column and displaying all Email's screen
    this.viewOne = true;
    this.viewAll = false;

    this.currentData = objectReceived;    // assingning data to current data for child component
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildUpdateClick(objectReceived: Email): void {

    // hiding update screen and displaying all Email's screen
    this.viewAll = false;
    this.viewUpdate = true;

    // assingning data to current data for child component
    this.currentData = objectReceived;
  }

  // For navigate to update screen with data
  // function will call when child update button is clicked 
  onChildDeleteClick(objectReceived: Email): void {
    this.deleteEmail(objectReceived);
  }

  // For navigate to activate screen with data
  // function will call when child update button is clicked 
  onChildActivateClick(objectReceived: Email): void {
    // this.activateEmail(objectReceived);
  }

  // on addComponents's submit button clicked
  onAddEmailSubmit(objectReceived: Email): void {
    this.addEmail(objectReceived);
  }

  // on updateComponents's submit button clicked
  onUpdateEmailSubmit(objectReceived: Email) {
    // alert(JSON.stringify(objectReceived))
    this.updateEmail(objectReceived);
  }

  ///////////////////////////////////////////
  // Funcation calls specific to this module
  ///////////////////////////////////////////

  // for getting all admin Profiles
  private getAllAdminProfiles() {

    // calling service to get all data
    this.profileService.getAllProfiles().subscribe(
      response => {
        this.profiles = response; //assign data to local variable
      },
      error => {
        console.log('No data in table ');
      }
    );
  }

  // for getting all admin Emails
  private getAllEmails() {

    // calling service to get all data
    this.service.getAllEmails().subscribe(
      response => {
        this.allData = response; //assign data to local variable
      },
      error => {
        console.log('No data available ');
      }
    );
  }


  // adding Email
  private addEmail(currentData: Email) {
    currentData.emailIsActive = true;
    this.service.insertEmail(currentData).subscribe(
      response => {
        alert('Email added successfully');
        this.emptyEmail = {} as Email;
        this.ngOnInit();
        this.back();
      },
      error => {
        alert("Failed to add Email");
      }

    );
  }

  // updating Email by usign title
  private updateEmail(currentData: Email) {
    this.service.updateEmail(currentData).subscribe(
      response => {
        alert('Email updated successfully');
        this.back();
      },
      error => {
        alert("Failed to update Email");
      }
    );
  }

  // For deleting Email (soft delete) using title
  private deleteEmail(currentData: Email) {
    this.service.deleteEmail(currentData.title).subscribe(
      response => {
        alert('Email deleted successfully');
        this.ngOnInit();
      },
      error => {
        alert("Failed to delete Email");
      }
    );
  }

  // // For getting all inactive Email
  // private getInActiveEmails() {

  //   // calling service to get all inactive record
  //   this.service.getAllDeactivatedEmails().subscribe(
  //     response => {
  //       this.allInActiveData = response;
  //     },
  //     error => {
  //       console.log('No data in table ');
  //     }
  //   );


  // // for activate Email by using admin id
  // activateEmail(Email: Email) {
  //   // if (this.isObjectComplete(Email)) {
  //   this.service.activateEmail(Email.emailId).subscribe(
  //     response => {

  //       alert('Email activated successfully');
  //       this.ngOnInit();

  //     },
  //     error => {
  //       alert("Email activation failed");
  //     }
  //   );

  // }

}