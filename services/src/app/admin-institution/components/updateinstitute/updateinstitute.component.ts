import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminInstitution } from 'app/admin-institution/class/admininstitution';
import { AdmininstitutionService } from 'app/admin-institution/service/admininstitution.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-updateinstitute',
  templateUrl: './updateinstitute.component.html',
  styleUrls: ['./updateinstitute.component.css']
})
export class UpdateinstituteComponent {
  file!: File;
  sigFile!: File;
  admininstitution: AdminInstitution;
  admininstitutionById: AdminInstitution;
  moduleName: string = 'Institute Administration'
  fileName: string;
  institutionId: any;
  buttonDisabled = true;
  displayUrl: any;
  institutionUrl: string;
  displayInstUrl: any;
  descriptionEntered: boolean=false;
  originalDescription: any;


  constructor(private _institutionService: AdmininstitutionService, private _activatedRoute: ActivatedRoute){
    this.admininstitution = new AdminInstitution();
    this.admininstitutionById = new AdminInstitution();
    this.institutionUrl = `${environment.adminInstitutionUrl}/institution`;
    this.fileName = '';
    
  }


  ngOnInit(): void {

    //variables to store data form url
    this.institutionId = this._activatedRoute.snapshot.paramMap.get('id');
    this.getInstitutionById(this.institutionId);
    this.displayUrl = this.institutionUrl + '/getSigFileById'
    this.displayInstUrl = this.institutionUrl + '/getFileById'

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.admininstitution.adminInstitutionPicture = this.file.name;
    console.log(this.file);
    //console.log(this.admininstitution.adminInstitutionPicture);
  }


    //file selection code
    onFileSelectedForSignature(event: any) {
      this.sigFile = event.target.files[0];
      this.admininstitution.instSignature = this.sigFile.name;
      console.log(this.sigFile);
      //console.log(this.admininstitution.adminInstitutionPicture);
    }

    getInstitutionById(id:number){
   
      this._institutionService.getInstitutionByInstId(id).subscribe(
        (response)=>{

                  this.admininstitution = response;
                  setTimeout(() => {
                    this.admininstitution.adminInstitutionName =  this.admininstitution.adminInstitutionName;
                  }, 1000);
                  this.originalDescription = this.admininstitution.adminInstitutionDescription; // Set the original value initially

                  console.log("   this.admininstitutionById")
                  console.log(this.admininstitution)

        }
      )

    }
    // for inserting new Institution in table
    updateInstitution(inst: AdminInstitution) {
      console.log("in function...")
      // if (this.backupInst.findIndex((data) => data.adminInstitutionName === inst.adminInstitutionName) >= 0) {
      //   console.log('Institute name already exists. Please enter another.');
      // } else {
        // this.admininstitution = {} as AdminInstitution;

        console.log(this.descriptionEntered)
       if(this.descriptionEntered == true){
        this.admininstitution.adminInstitutionDescription = inst.adminInstitutionDescription;
       }
        // this.admininstitution.adminInstitutionIsActive = true;
        this.admininstitution.adminInstitutionPicture = inst.adminInstitutionPicture;
        this.admininstitution.instSignature = inst.instSignature;
  
        const instituteJson = JSON.stringify(this.admininstitution);
        const blob = new Blob([instituteJson], { type: 'application/json' });
  
  
  
        const signaturefile = 'default-signature-file.jpg'; // Set your default signature file here
  
  
        let formData = new FormData();
        formData.append("file", this.file);
        formData.append("signaturefile", this.sigFile);
        formData.append("admin", new Blob([JSON.stringify(this.admininstitution)], { type: 'application/json' }));
  
        this._institutionService.updateInstitution(this.institutionId,formData).subscribe(
          (response) => {
            console.log("in api");
            // this.admininstitution = {} as AdminInstitution;
            this.admininstitution = response;
            console.log(response)

           window.location.reload();
          })
      //       this.admininstitutions[this.admininstitutions.indexOf(inst)] = Object.assign(
      //         {},
      //         this.backupInst[this.backupInst.findIndex((data) => data.adminInstitutionId == inst.adminInstitutionId)]
      //       );
  
      //       this.admininstitutions.push(this.admininstitution);
      //       this.backupInst.push(Object.assign({}, this.admininstitution));
  
      //       this.dialogueBoxService.open("Institute Added successfully", "information").then((response) => {
      //         if (response) {
      //           location.reload(); // Refresh the page
      //         }
      //       });
  
  
      //       this._route.navigate(['displayinstitute', this.userName]);
  
      //       if (this.admininstitutions.length > 0) {
      //         this.isHidden = false;
      //       }
      //     },
      //     (error) => {
      //       this.dialogueBoxService.open('Failed to Add Institute', 'warning');
      //     }
      //   );
      // }
    }

    checkFields() {
      // Check if any fields are empty
      if (!this.admininstitution.adminInstitutionPicture  || !this.admininstitution.instSignature  || !this.admininstitution.adminInstitutionDescription ) {
        // If any field is empty, disable the button                          
        this.buttonDisabled = true;
      } 
      // else if(this.admininstitution.adminInstitutionDescription){

      //  this.descriptionEntered = true;

      // }
      else {
        // If all fields have a value, enable the button
        this.buttonDisabled = false;
      }
    }
  
     
     
    // onInputChange(newValue: string) {
    //   // The `newValue` parameter contains the updated value of the textbox
    //   console.log(newValue)
    //     this.descriptionEntered = true;
   
  
    //   // You can perform any additional actions or logic here
    //   // For example, update other properties, make API calls, etc.
    // }
     //back button routing
  back() {
    window.history.back();
  }


}
