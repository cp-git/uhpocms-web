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
  fileName: string;
  // _disablevar: boolean = false;
  buttonDisabled = true;
  // Institution array
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];

  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;


  constructor(private _institutionService: AdmininstitutionService, private _route: Router) {
    this.admininstitution = new AdminInstitution();
    this.fileName = '';
  }


  onFileSelected(event: any) {
    this.fileName = event.target.files[0].name;
    if (this.fileName != '') {
      //this.disablefunc();
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
      this.admininstitution.adminInstitutionIsActive = true;
      this.admininstitution.adminInstitutionPicture = this.fileName;

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
          alert('Institute Added Successfuly');
          this._route.navigate(['displayinstitute']);

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


  checkFields() {
    // Check if any fields are empty
    if (!this.admininstitution.adminInstitutionName || !this.admininstitution.adminInstitutionDescription || !this.admininstitution.adminInstitutionPicture) {
      // If any field is empty, disable the button
      this.buttonDisabled = true;
    } else {
      // If all fields have a value, enable the button
      this.buttonDisabled = false;
    }
  }



  Back() {
    this._route.navigate(['displayinstitute']);
  }

}