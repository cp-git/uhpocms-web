import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmininstitutionService } from '../../service/admininstitution.service';

import { Location } from '@angular/common';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment.development';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';
import { AuthUserPermission } from 'app/permissions/class/auth-user-permission';
import { userModule } from 'app/permissions/enum/user-module.enum';
import { AuthUserPermissionService } from 'app/permissions/services/authUserPermission/auth-user-permission.service';
@Component({
  selector: 'app-displayinstitute',
  templateUrl: './displayinstitute.component.html',
  styleUrls: ['./displayinstitute.component.css']
})
export class DisplayinstituteComponent {
  moduleName = 'Institution Administration';
  @Input() admininstitutions: AdminInstitution[] = [];
  // Institution array
  // admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;
  userName!: string;
  adminId: any;
  institutionId: any;

  // for buttons to view
  // showAddButton: boolean = true;
  // showActivateButton: boolean = true;

  private readonly institutionUrl!: string;

  displayUrl: any;

  // for user Permissions
  buttonsArray: any;
  userAndRolePermissions: AuthUserPermission[] = [];
  userModule = userModule;

  //constructor
  constructor(private _institutionService: AdmininstitutionService, private _route: Router, private location: Location, private _activatedRoute: ActivatedRoute, private _sanitizer: DomSanitizer, private dialogBoxService: DialogBoxService, private userPermissionService: AuthUserPermissionService) {
    this.admininstitution = new AdminInstitution();
    this.institutionUrl = `${environment.adminInstitutionUrl}/institution`;

    // Assining default values
    this.buttonsArray = {
      showAddButton: false,
      showActivateButton: false,
      showUpdateButton: false,
      showDeleteButton: false
    }
  }

  //ngOnint function
  ngOnInit(): void {
    this.loadAndLinkUserPermissions();
    //if not authenticated route back to login page
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login']);
    }

    //if authenticated
    else {
      //code to get data from url
      this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];

      //onload of page this function should be executed
      this.getAllInstitution();
      this.displayUrl = this.institutionUrl + '/getFileById'

    }
  }

  // this function for loading permission from session storage and link permission 
  // with buttons to show and hide based on permissions 
  private async loadAndLinkUserPermissions() {
    this.userAndRolePermissions = await this.userPermissionService.linkAndLoadPermissions(userModule.INSTITUTION, this.userAndRolePermissions, this.buttonsArray);
    await this.userPermissionService.toggleButtonsPermissions(userModule.INSTITUTION, this.userAndRolePermissions, this.buttonsArray);
  }


  // for displaying empty when there is no data on ui
  private displayEmptyRow() {
    if (this.admininstitutions.length <= 0) {
      this.isHidden = true;
      this.admininstitution = {} as AdminInstitution;
      this.admininstitution.adminInstitutionIsActive = true;
    }
  }

  //function to route 
  addInstitute() {
    this._route.navigate(['addinstitute', this.userName])
  }

  //function to get all institutions
  public getAllInstitution() {
    // fetching all institution
    this._institutionService.fetchAdminInstitutionList().subscribe(
      (response) => {
        // assigning received data to institution
        this.admininstitutions = response;


        for (let i = 0; i < this.admininstitutions.length; i++) {
          console.log(this.admininstitutions[i].adminInstitutionPicture);
        }
        this.admininstitutions.sort((a, b) => a.adminInstitutionName.toLowerCase() > b.adminInstitutionName.toLowerCase() ? 1 : -1) // order by alphabets for institution name


        //  cloning array from instituion to backupinst
        this.admininstitutions.forEach((inst) => {
          this.backupInst.push(Object.assign({}, inst));
        });

        // when data not available
        if (this.admininstitutions.length > 0) {
          this.isHidden = false;
        }
      },
      (error) => {
        this.displayEmptyRow();
        console.log('No data in table ');
      }
    );
  }



  // // for deleting institution by name
  // deleteInstitution(inst: AdminInstitution) {
  //   // calling service mathod to delete institution
  //   this._institutionService.deleteInstitution(inst.adminInstitutionName).subscribe(
  //     (response) => {
  //       this.admininstitutions.splice(this.admininstitutions.indexOf(inst), 1);
  //       this.backupInst.splice(this.admininstitutions.indexOf(inst), 1);
  //       // console.log(inst.adminInstitutionName + ' Institution deleted successfully');
  //       console.log(inst.adminInstitutionName + ' Institution deleted successfully');
  //       this.displayEmptyRow();
  //     },
  //     (error) => {
  //       console.log('not able to delete \n' + JSON.stringify(error.error));
  //     }
  //   );
  // }



  // For deleting (soft delete) by id
  deleteInstitution(adminInstitutionId: number) {
    this.dialogBoxService.open('Are you sure you want to delete this Institute ? ', 'decision').then((response) => {
      if (response) {
        console.log('User clicked OK');
        // Do something if the user clicked OK
        // calling service to soft delte
        this._institutionService.deleteInstitutionById(adminInstitutionId).subscribe(

          (response) => {
            this.dialogBoxService.open('Institute deleted successfully', 'information');
            this.ngOnInit();
          },
          (error) => {
            this.dialogBoxService.open('Institute deletion Failed', 'warning');
          }
        );
      } else {
        console.log('User clicked Cancel');
        // Do something if the user clicked Cancel
      }
    });
  }

  back() {
    //this.location.back();
    this._route.navigate(['adminmodule/admin', this.userName]);
  }

  redirectToActivateInstitution() {
    this._route.navigate(['displayinstitute/activate', this.userName]);
  }


}
