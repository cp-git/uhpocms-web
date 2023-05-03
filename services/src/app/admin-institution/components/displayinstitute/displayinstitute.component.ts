import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmininstitutionService } from '../../service/admininstitution.service';

import { Location } from '@angular/common';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';

@Component({
  selector: 'app-displayinstitute',
  templateUrl: './displayinstitute.component.html',
  styleUrls: ['./displayinstitute.component.css']
})
export class DisplayinstituteComponent {
  moduleName = 'Institute Administration';
  // Institution array
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;
  userName!: string;
  adminId: any;

  // for buttons to view
  showAddButton: boolean = true;
  showActivateButton: boolean = true;

  //constructor
  constructor(private _institutionService: AdmininstitutionService, private _route: Router, private location: Location, private _activatedRoute: ActivatedRoute) {
    this.admininstitution = new AdminInstitution();
  }

  //ngOnint function
  ngOnInit(): void {

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

    }
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
  private getAllInstitution() {
    // fetching all institution
    this._institutionService.fetchAdminInstitutionList().subscribe(
      (response) => {
        // assigning received data to institution
        this.admininstitutions = response;
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

  // for deleting institution by name
  deleteInstitution(inst: AdminInstitution) {
    // calling service mathod to delete institution
    this._institutionService.deleteInstitution(inst.adminInstitutionName).subscribe(
      (response) => {
        this.admininstitutions.splice(this.admininstitutions.indexOf(inst), 1);
        this.backupInst.splice(this.admininstitutions.indexOf(inst), 1);
        // console.log(inst.adminInstitutionName + ' Institution deleted successfully');
        console.log(inst.adminInstitutionName + ' Institution deleted successfully');
        this.displayEmptyRow();
      },
      (error) => {
        console.log('not able to delete \n' + JSON.stringify(error.error));
      }
    );
  }

  back() {
    //this.location.back();
    this._route.navigate(['adminmodule/admin', this.userName]);
  }

  redirectToActivateInstitution() {
    this._route.navigate(['displayinstitute/activate', this.userName]);
  }

  display(adminInstitutionId: number) {
    this._route.navigate(['display', adminInstitutionId, this.userName])
  }
}
