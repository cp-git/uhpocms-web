import { Component } from '@angular/core';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { AdminInstitution } from 'app/class/admin-institution';
import { InstituteAdmin } from 'app/instituteadminprofile/institute-admin';
import { InstituteAdminServiceService } from 'app/instituteadminprofile/institute-admin-service.service';
import { InstitutionSeriveService } from 'app/instituteadminprofile/institution-serive.service';
import { Admin } from 'app/roleadmin/admin';
import { AdminroleserviceService } from 'app/roleadmin/adminroleservice.service';

@Component({
  selector: 'app-allot-permission',
  templateUrl: './allot-permission.component.html',
  styleUrls: ['./allot-permission.component.css']
})
export class AllotPermissionComponent {



  //testing data
  permission: string = "Create Course";
  roleId: string | undefined;
  profileId: string = "3";
  institutionId: string | undefined;

  //class arrays
  institutions: AdminInstitution[] | undefined;
  userroles: Admin[] | undefined;
  profiles: InstituteAdmin[] | undefined;

  //classes 
  institution: AdminInstitution = new AdminInstitution;
  role: Admin = new Admin;
  profile: InstituteAdmin = new InstituteAdmin;


  //constructor
  constructor(private institutionService: AdmininstitutionService, private roleService: AdminroleserviceService,
    private profileService: InstituteAdminServiceService) {

  }

  ngOnInit() {

    this.getInstitutions();
    this.getRoles();
  }

  //function to get institutions array
  getInstitutions() {

    this.institutionService.fetchAdminInstitutionList().subscribe(
      (response) => {

        this.institutions = response;

      }
    );
  }

  //function to get roles list fro profiles list
  getRoles() {

    this.roleService.fetchadminlist().subscribe(
      (response) => {
        this.profiles = response;
        console.log(response)
      }
    )


  }



}
