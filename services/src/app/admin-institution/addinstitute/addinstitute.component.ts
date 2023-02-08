import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AdminInstitution } from '../admininstitution';
import { AdmininstitutionService } from '../service/admininstitution.service';

@Component({
  selector: 'app-addinstitute',
  templateUrl: './addinstitute.component.html',
  styleUrls: ['./addinstitute.component.css']
})
export class AddinstituteComponent {
  // Institution array
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;

  constructor(private _institutionService: AdmininstitutionService, private _route: Router) {
    this.admininstitution = new AdminInstitution();
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this._route.navigate(['login']);
    } else {
      this.getAllInstitution();

    }
  }


  // for inserting new Institution in table
  addInstitution(inst: AdminInstitution) {
    if (this.backupInst.findIndex((data) => data.adminInstitutionName === inst.adminInstitutionName) >= 0) {
      alert('Institute name already exist. please enter another.');
    } else {
      // assigning value
      this.admininstitution = {} as AdminInstitution;
      this.admininstitution.adminInstitutionName = inst.adminInstitutionName;
      this.admininstitution.adminInstitutionDescription = inst.adminInstitutionDescription;
      this.admininstitution.adminInstitutionIsActive = inst.adminInstitutionIsActive;
      this.admininstitution.adminInstitutionPicture = inst.adminInstitutionPicture;

      // inserting Institution
      this._institutionService.addInstitution(this.admininstitution).subscribe(
        (response) => {
          this.admininstitution = {} as AdminInstitution;
          this.admininstitution = response;

          // replacing value from backup to admininstitutions
          this.admininstitutions[this.admininstitutions.indexOf(inst)] = Object.assign(
            {},
            this.backupInst[
            this.backupInst.findIndex((data) => data.adminInstitutionId == inst.adminInstitutionId)
            ]
          );

          this.admininstitutions.push(this.admininstitution);
          this.backupInst.push(Object.assign({}, this.admininstitution));
          alert('Added Successfuly');

          if (this.admininstitutions.length > 0) {
            this.isHidden = false;
          }
        },
        (error) => {
          alert('not able to add data \n' + JSON.stringify(error.error));
        }
      );
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
}