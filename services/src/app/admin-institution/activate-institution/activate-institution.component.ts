import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from '../admininstitution';
import { AdmininstitutionService } from '../service/admininstitution.service';

@Component({
  selector: 'app-activate-institution',
  templateUrl: './activate-institution.component.html',
  styleUrls: ['./activate-institution.component.css', '../../app.component.css']
})
export class ActivateInstitutionComponent implements OnInit {

  institutions: AdminInstitution[] = [];
  userName!: string;
  adminId: any;

  constructor(private _institutionService: AdmininstitutionService, private _router: Router,
    private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];
    console.log(this.userName)
    this.getAllDeactivatedInstitutions();
  }

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

  home() {

    this._router.navigate(['displayinstitute', this.userName]);
  }


}
