import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';

import { AdmininstitutionService } from '../../service/admininstitution.service';

@Component({
  selector: 'app-activate-institution',
  templateUrl: './activate-institution.component.html',
  styleUrls: ['./activate-institution.component.css', '../../app.component.css']
})
export class ActivateInstitutionComponent implements OnInit {

  //variable initialization
  institutions: AdminInstitution[] = [];
  userName!: string;
  adminId: any;

  //constructor
  constructor(private _institutionService: AdmininstitutionService, private _router: Router,
    private _activatedRoute: ActivatedRoute) {

  }


  //ngOnint method
  ngOnInit(): void {

    //variables to get data from url
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];

    //onload of page this function should execute
    this.getAllDeactivatedInstitutions();
  }

  //function to get all inactive institutions
  getAllDeactivatedInstitutions() {

    this._institutionService.getDeactivatedInstitutions().subscribe(
      response => {
        this.institutions = response;
      },
      error => {
        alert("Failed to fetch data");
      }
    );
  }

  //function to activate inactive institution by id
  activateInstitution(institutionId: number) {
    this._institutionService.activateInstitutionById(institutionId).subscribe(
      response => {
        alert("Institution activated");
        this.ngOnInit();
      },
      error => {
        alert("Institution activation failed");
      }
    );
  }


  //routing function
  home() {
    this._router.navigate(['displayinstitute', this.userName]);
  }


}
