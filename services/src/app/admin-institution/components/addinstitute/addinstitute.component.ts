import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { DialogBoxService } from 'app/shared/services/HttpInterceptor/dialog-box.service';


@Component({
  selector: 'app-addinstitute',
  templateUrl: './addinstitute.component.html',
  styleUrls: ['./addinstitute.component.css']
})

export class AddinstituteComponent {
  file!: File;

  //variable declarations
  fileName: string;
  buttonDisabled = true;
  admininstitutions: AdminInstitution[] = [];
  backupInst: AdminInstitution[] = [];
  userName!: string;
  adminId: any;


  // for extra row when there is no data
  isHidden: boolean = false;
  hideId: boolean = false;
  admininstitution: AdminInstitution;


  //constructor
  constructor(private _institutionService: AdmininstitutionService, private _route: Router, private _activatedRoute: ActivatedRoute,private dialogueBoxService:DialogBoxService) {
    this.admininstitution = new AdminInstitution();
    this.fileName = '';
  }

  //ngOninit function
  ngOnInit(): void {

    //variables to store data form url
    this.adminId = this._activatedRoute.snapshot.paramMap.get('id');
    this.userName = this._activatedRoute.snapshot.params['userName'];



  }




  //file selection code
  onFileSelected(event: any) {


    this.file = event.target.files[0];
    this.admininstitution.adminInstitutionPicture = this.file.name;

    console.log(this.file);

    //console.log(this.admininstitution.adminInstitutionPicture);
  }








  // for inserting new Institution in table
  addInstitution(inst: AdminInstitution) {

    console.log("in function...")
    if (this.backupInst.findIndex((data) => data.adminInstitutionName === inst.adminInstitutionName) >= 0) {
      // alert('Institute name already exist. please enter another.');
      console.log('Institute name already exist. please enter another.');
    } else {
      // assigning value
      this.admininstitution = {} as AdminInstitution;
      this.admininstitution.adminInstitutionName = inst.adminInstitutionName;
      this.admininstitution.adminInstitutionDescription = inst.adminInstitutionDescription;
      this.admininstitution.adminInstitutionIsActive = true;
      this.admininstitution.adminInstitutionPicture = inst.adminInstitutionPicture;

      const instituteJson = JSON.stringify(this.admininstitution);

      const blob = new Blob([instituteJson], {
        type: 'application/json'
      })

      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("admin", new Blob([JSON.stringify(this.admininstitution)], { type: 'application/json' }));





      // inserting Institution
      this._institutionService.addInstitution(formData).subscribe(
        (response) => {
          console.log("in api");
          this.admininstitution = {} as AdminInstitution;
          this.admininstitution = response;
          console.log(response)


          // replacing value from backup to admininstitutions
          this.admininstitutions[this.admininstitutions.indexOf(inst)] = Object.assign(
            {},
            this.backupInst[
            this.backupInst.findIndex((data) => data.adminInstitutionId == inst.adminInstitutionId)
            ]
          );

          this.admininstitutions.push(this.admininstitution);
          this.backupInst.push(Object.assign({}, this.admininstitution));
          // alert('Institute Added Successfuly');
          this.dialogueBoxService.open('Institute Added successfully', 'information');
          this._route.navigate(['displayinstitute', this.userName]);

          if (this.admininstitutions.length > 0) {
            this.isHidden = false;
          }
        },
        (error) => {
          // alert('not able to add data \n' + JSON.stringify(error.error));
          // console.log('not able to add data \n' + JSON.stringify(error.error));
          this.dialogueBoxService.open('Failed to Add Institute', 'warning'); 

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




  //back button routing
  Back() {
    this._route.navigate(['displayinstitute', this.userName]);
  }

}