import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';

import { AdmininstitutionService } from '../../service/admininstitution.service';

import { environment } from 'environments/environment.development';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';



@Component({
  selector: 'app-activate-institution',
  templateUrl: './activate-institution.component.html',

  styleUrls: ['./activate-institution.component.css']

})
export class ActivateInstitutionComponent implements OnInit {
  moduleName = 'Institute Administration';
  //variable initialization
  institutions: AdminInstitution[] = [];
  userName!: string;
  adminId: any;


  displayUrl: any;

  private readonly institutionUrl!: string;
  // for buttons to view
  showAddButton: boolean = false;
  showActivateButton: boolean = false;
  //constructor
  constructor(private _institutionService: AdmininstitutionService, private _router: Router,

    private _activatedRoute: ActivatedRoute, private dialogBoxService: DialogBoxService) {


    this.institutionUrl = `${environment.adminInstitutionUrl}/institution`;


  }


  //ngOnint method
  ngOnInit(): void {

    //variables to get data from url
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];

    //onload of page this function should execute
    this.getAllDeactivatedInstitutions();
    this.displayUrl = this.institutionUrl + '/getFileById'
  }

  //function to get all inactive institutions
  getAllDeactivatedInstitutions() {

    this._institutionService.getDeactivatedInstitutions().subscribe(
      response => {
        this.institutions = response;
        this.institutions.sort((a, b) => a.adminInstitutionName.toLowerCase() > b.adminInstitutionName.toLowerCase() ? 1 : -1) // order by alphabets for institution name
      },
      error => {
        // alert("Failed to fetch data");
        console.log("Failed to fetch data");
      }
    );
  }

  //function to activate inactive institution by id
  activateInstitution(institutionId: number) {
    this._institutionService.activateInstitutionById(institutionId).subscribe(
      response => {
        // alert("Institution activated");
        this.dialogBoxService.open("Institute Activated", "information").then((response) => {
          if (response) {
            location.reload(); // Refresh the page
          }
        });
      },
      error => {
        // alert("Institution activation failed");
        this.dialogBoxService.open('Failed to Activate', 'warning');
      }
    );
  }


  //routing function
  home() {
    this._router.navigate(['displayinstitute', this.userName]);
  }


}
