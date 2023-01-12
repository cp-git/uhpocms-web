import { Component } from '@angular/core';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { Email } from '../email';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  emails: Email[] = [];
  email: Email;
  instituteAdmin: InstituteAdmin[] = [];
  sessionData: any;
  profileData: any;

  constructor(private _emailService: EmailService) {
    this.email = new Email();
    this.loadEmails();
  }

  ngOnInit(): void {
    this.getAllEmails();
  }

  getAllEmails() {
    this._emailService.fetchAllEmails().subscribe(
      response => {
        // assigning received data to emails
        this.emails = response;
        this.toggleExtraEmptyRow();
      },
      error => {
        alert("Data not found");
      }
    );
  }


  addEmail(toCreateEmail: Email) {

    toCreateEmail.emailId = null;

    this._emailService.insertEmail(toCreateEmail).subscribe(
      response => {
        this.email = response;
        this.ngOnInit();
        alert("Data added successfuly");
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
        this.ngOnInit();
        alert("Data updated successfuly");
      },
      error => {
        alert("Failed to update");
      }
    )
  }

  deleteEmail(emailTitle: string) {
    this._emailService.deleteEmail(emailTitle).subscribe(
      response => {
        this.ngOnInit();
        alert(emailTitle + " deleted successfuly");
      },
      error => {
        alert("Failed to delete");
      }
    )
  }

  private loadEmails() {
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
      this.emails.push(this.email);
    }
  }

}
