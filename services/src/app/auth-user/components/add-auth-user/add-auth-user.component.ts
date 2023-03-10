import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';

@Component({
  selector: 'app-add-auth-user',
  templateUrl: './add-auth-user.component.html',
  styleUrls: ['./add-auth-user.component.css']
})
export class AddAuthUserComponent implements OnInit {

  constructor(
    private router: Router,
    private authUserService: AuthUserService
  ) {

  }
  ngOnInit(): void {

  }
  back() {
    this.router.navigate(['/AuthUser']);
  }
  onChildButtonClick(objectReceived: any): void {
    // alert("onChildButtonClick" + JSON.stringify(objectReceived));
    this.add(objectReceived);
  }

  add(objectReceived: any) {
    this.authUserService.addAuthUser(objectReceived).subscribe(
      response => {
        alert(`Authuser added successfully !`);
      },
      error => {
        alert(`Failed to add Authuser !`);
      }
    )
  }
}
