import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { Location } from '@angular/common';
import { Email } from '../../class/email';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent {
  emails: Email[] = []; // for all email data
  backupEmails = new Map(); // for backup data
  email: Email;
  instituteAdmin: InstituteAdmin[] = []; // for dropdown data

  // empty row if data not available
  isHidden: boolean = false;

  // For session data
  sessionData: any;
  data: any;

  constructor(private emailService: EmailService, private router: Router, private location: Location) {
    this.email = new Email();
    this.loadInstituteProfile();
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('authenticatedUser') == null) {
      this.router.navigate(['login']);
    } else {
      this.getAllEmails();
    }
  }

  // to fetch all active emails
  getAllEmails() {
    this.emailService.fetchAllEmails().subscribe(
      (response) => {
        // assigning received data to emails
        this.emails = response;

        // assigning received data to backup
        this.emails.forEach((emailData) => {
          this.backupEmails.set(
            emailData.emailId,
            Object.assign({}, emailData)
          );
        });

        this.toggleExtraEmptyRow();
      },
      (error) => {
        alert('Data not found');
      }
    );
  }

  // to add data in email table
  addEmail(toCreateEmail: Email) {
    // variable to store emailId(id)
    var emailId = toCreateEmail.emailId;

    // setting emailId to null, to create new row(primary key must be unique)
    toCreateEmail.emailId = null;

    this.emailService.insertEmail(toCreateEmail).subscribe(
      (response) => {
        this.email = response;

        // if data present in backup
        if (this.backupEmails.size > 0) {
          this.emails[this.emails.indexOf(toCreateEmail)] = Object.assign(
            {},
            this.backupEmails.get(emailId)
          );
        }

        // adding data to emails and backup
        this.emails.push(this.email);
        this.backupEmails.set(
          this.email.emailId,
          Object.assign({}, this.email)
        );

        alert('Data added successfuly');

        if (this.emails.length > 0) {
          this.isHidden = false;
        }
      },
      (error) => {
        alert('Failed to add');
      }
    );
  }

  // for updating email
  updateEmail(toUpdateEmail: Email) {
    this.emailService.updateEmail(toUpdateEmail).subscribe(
      (response) => {
        this.email = response;

        // replacing value of updated object in backup
        this.backupEmails.set(
          this.email.emailId,
          Object.assign({}, this.email)
        );
        alert('Data updated successfuly');

        if (this.emails.length > 0) {
          this.isHidden = false;
        }
      },
      (error) => {
        alert('Failed to update');
      }
    );
  }

  // for deleting record using email title
  deleteEmail(toDeleteEmail: Email) {
    this.emailService.deleteEmail(toDeleteEmail.title).subscribe(
      (response) => {
        // removing object from emails array and backup
        this.emails.splice(this.emails.indexOf(toDeleteEmail), 1);
        this.backupEmails.delete(toDeleteEmail.emailId);

        alert(toDeleteEmail.title + ' deleted successfuly');

        this.toggleExtraEmptyRow();
      },
      (error) => {
        alert('Failed to delete');
      }
    );
  }

  // for getting all institute profile data from sessionStorage
  private loadInstituteProfile() {
    this.sessionData = sessionStorage.getItem('instituteprofile');

    // convert string data to json
    this.instituteAdmin = JSON.parse(this.sessionData);

    this.data = JSON.parse(this.sessionData);

    for (var inst in this.data) {
      this.instituteAdmin.push(this.data[inst]);
    }
  }

  // for empty row
  private toggleExtraEmptyRow() {
    if (this.emails.length <= 0) {
      // setting empty object for empty row
      this.email = {} as Email;

      // default value while adding record
      this.email.emailIsActive = true;
      this.isHidden = true;
    }
  }

  // back button
  homePage() {
    this.location.back();
    // this.router.navigate(['demo']);
  }
}
