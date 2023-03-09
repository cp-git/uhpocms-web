import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AdminInstitution } from '../admininstitution';
import { AdmininstitutionService } from '../service/admininstitution.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-displayinstitute',
  templateUrl: './displayinstitute.component.html',
  styleUrls: ['./displayinstitute.component.css']
})
export class DisplayinstituteComponent {
  // Institution array
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;

  userName!: string;
  adminId: any;

  constructor(private _institutionService: AdmininstitutionService, private _route: Router, private location: Location, private _activatedRoute: ActivatedRoute) {
    this.admininstitution = new AdminInstitution();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login']);
    } else {
      this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
      this.userName = this._activatedRoute.snapshot.params['userName'];
      console.log(this.userName)
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


  addInstitute() {
    console.log("in function")
    this._route.navigate(['addinstitute', this.userName])
  }

  private getAllInstitution() {
    // fetching all institution
    this._institutionService.fetchAdminInstitutionList().subscribe(
      (response) => {
        // assigning received data to institution
        this.admininstitutions = response;

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
  Back() {
    //this.location.back();
    this._route.navigate(['adminmodule/admin', this.userName]);
  }

  redirectToActivateInstitution() {
    this._route.navigate(['displayinstitute/activate']);
  }

  display(adminInstitutionId: number) {
    this._route.navigate(['display', adminInstitutionId, this.userName])
  }
}
