import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { Email } from '../email';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  emails: Email[] = []; // for all email data
  backupEmails = new Map();
  email: Email;
  instituteAdmin: InstituteAdmin[] = []; // for dropdown data
  sessionData: any;
  profileData: any;
  isHidden: boolean = false;
  constructor(private _emailService: EmailService, private _route: Router) {
    this.email = new Email();
    this.loadInstituteProfile();
  }

  ngOnInit(): void {
    this.getAllEmails();
  }

  getAllEmails() {
    this._emailService.fetchAllEmails().subscribe(
      response => {
        // assigning received data to emails
        this.emails = response;
        this.emails.forEach(emailData => { this.backupEmails.set(emailData.emailId, (Object.assign({}, emailData))) });
        this.toggleExtraEmptyRow();
      },
      error => {
        alert("Data not found");
      }
    );
  }


  addEmail(toCreateEmail: Email) {
    var emailId = toCreateEmail.emailId;

    toCreateEmail.emailId = null;
    this._emailService.insertEmail(toCreateEmail).subscribe(
      response => {

        this.email = response;
        //  this.ngOnInit();
        if (this.backupEmails.size > 0) {
          this.emails[this.emails.indexOf(toCreateEmail)] = (Object.assign({}, this.backupEmails.get(emailId)));
        }
        this.emails.push(this.email);
        this.backupEmails.set(this.email.emailId, (Object.assign({}, this.email)));
        alert("Data added successfuly");
        if (this.emails.length > 0) {
          this.isHidden = false;
        }
      },
      error => {
        alert("Failed to add");
      }
    )

  }

  updateEmail(toUpdateEmail: Email) {

    this._emailService.updateEmail(toUpdateEmail).subscribe(
      response => {
        this.email = response;
        this.backupEmails.set(this.email.title, (Object.assign({}, this.email)));
        // this.ngOnInit();
        alert("Data updated successfuly");

        if (this.emails.length > 0) {
          this.isHidden = false;
        }
      },
      error => {
        alert("Failed to update");
      }
    )

  }

  deleteEmail(toDeleteEmail: Email) {
    this._emailService.deleteEmail(toDeleteEmail.title).subscribe(
      response => {

        this.emails.splice(this.emails.indexOf(toDeleteEmail), 1);
        this.backupEmails.delete(toDeleteEmail.emailId)
        // this.ngOnInit();
        alert(toDeleteEmail.title + " deleted successfuly");

        this.toggleExtraEmptyRow();
      },
      error => {
        alert("Failed to delete");
      }
    )
  }

  private loadInstituteProfile() {
    this.sessionData = sessionStorage.getItem("instituteprofile");
    this.profileData = JSON.parse(this.sessionData);

    for (var inst in this.profileData) {
      this.instituteAdmin.push(this.profileData[inst]);
    }
  }
  private toggleExtraEmptyRow() {
    if (this.emails.length <= 0) {
      this.email = ({} as Email);
      this.email.emailIsActive = true;
      this.isHidden = true;
    }
  }

  homePage() {
    this._route.navigate(['demo'])
  }

}
