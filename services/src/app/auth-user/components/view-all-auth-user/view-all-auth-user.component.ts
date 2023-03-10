import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from 'app/auth-user/entity/auth-user';
import { AuthUserService } from 'app/auth-user/services/auth-user.service';
import { TableModule } from 'app/front/module/table.module';
@Component({
  selector: 'app-view-all-auth-user',
  templateUrl: './view-all-auth-user.component.html',
  styleUrls: ['./view-all-auth-user.component.css']
})
export class ViewAllAuthUserComponent implements OnInit {
  dataAvailable: boolean = false;
  authUsers: AuthUser[] = [];
  currentData: AuthUser;

  constructor(
    private authUserService: AuthUserService,
    private router: Router) {

    this.currentData = new AuthUser();
  }
  ngOnInit(): void {
    this.getAllAuthUsersData();
  }

  getAllAuthUsersData() {
    this.authUserService.getAllAuthUsers().subscribe(
      response => {
        //assign data to local variable
        this.authUsers = response;
        //assign data to service variable
        this.authUserService.authUsers = this.authUsers;
        // alert(JSON.stringify(this.authUserService.authUsers))
        if (this.authUserService.authUsers.length > 0) {
          this.dataAvailable = true;
        }
      },
      error => {

      }
    );
  }
  onChildButtonClick(objectReceived: any): void {
    // alert("onChildButtonClic2k" + JSON.stringify(objectReceived));
    this.currentData = objectReceived;
    this.authUserService.currentAuthUserData = this.currentData;
    this.router.navigate(['/AuthUser/view'])
  }

  navigateToAdd() {
    this.router.navigate(['/AuthUser/add']);
  }

  back() {
    this.router.navigate(['/demo']);
  }

}
