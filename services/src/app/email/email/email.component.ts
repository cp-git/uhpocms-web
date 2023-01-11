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
      },
      error => {
        alert("Data not found");
      }
    );
  }

  private loadEmails() {
    this.sessionData = sessionStorage.getItem("instituteprofile");
    this.profileData = JSON.parse(this.sessionData);

    for (var inst in this.profileData) {
      this.instituteAdmin.push(this.profileData[inst]);

    }
  }

  addEmail(toCreateEmail: Email) {

    toCreateEmail.emailId = null;

    this._emailService.insertEmail(toCreateEmail).subscribe(
      response => {
        this.email = response;
        this.ngOnInit();
      },
      error => {
        alert("failed to add");
      }
    )
  }

  updateEmail(toUpdateEmail: Email) {
    alert(JSON.stringify(toUpdateEmail))
    this._emailService.updateEmail(toUpdateEmail).subscribe(
      response => {
        this.email = response;
        this.ngOnInit();
      },
      error => {
        alert("failed to update");
      }
    )
  }
}
