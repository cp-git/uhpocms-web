import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {
  // data coming from parent component
  @Input() data: { currentData: any, columnNames: any } = { currentData: null, columnNames: null };
  @Input() dropdown1?: { optionsArray1: any, dropdownColumnId1: string, dropdownColumnName1: string };
  @Input() dropdown2?: { optionsArray2: any, dropdownColumnId2: string, dropdownColumnName2: string };
  @Input() dropdown?: any;
  // event for parent component 
  @Output() submitClicked: EventEmitter<any> = new EventEmitter();
  @Output() getSelectedOptionOfDropdown: EventEmitter<any> = new EventEmitter();
  columnNames: any;
  currentData: any;

  // for dropdown
  optionsArray1: any;
  dropdownColumnId1: any;
  dropdownColumnName1: any;

  // for dropdown
  optionsArray2: any;
  dropdownColumnId2: any;
  dropdownColumnName2: any;
  file!: File;
  constructor(
  ) { }

  onSubmitClicked(objectToAdd: any): void {
    this.submitClicked.emit(objectToAdd);
  }

  ngOnInit(): void {

    // assigning variable coming from parent to local variables
    this.columnNames = this.data.columnNames;
    this.currentData = this.data.currentData
    this.initialiseDropdownData();
  }

  file!: File;
  onFileSelected(event: any) {
    // console.log(event);


    this.file = event.target.files[0];


  }

  initialiseDropdownData() {
    if (this.dropdown1?.optionsArray1 != undefined) {
      this.optionsArray1 = this.dropdown1?.optionsArray1;
      this.dropdownColumnId1 = this.dropdown1?.dropdownColumnId1;
      this.dropdownColumnName1 = this.dropdown1?.dropdownColumnName1;
      // console.log( this.optionsArray1 )
      console.log(this.optionsArray1)
    }

    if (this.dropdown2?.optionsArray2 != undefined) {
      this.optionsArray2 = this.dropdown2?.optionsArray2;
      this.dropdownColumnId2 = this.dropdown2?.dropdownColumnId2;
      this.dropdownColumnName2 = this.dropdown2?.dropdownColumnName2;
      // console.log( this.optionsArray2)
      console.log(this.optionsArray2)
    }
  }

  onDropdownSelected(option: any) {
    console.log('called onDropdownSelected');
    this.getSelectedOptionOfDropdown.emit(option);
  }

  isValidDate(dateStr: string): boolean {
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    return isoDatePattern.test(dateStr) && !isNaN(Date.parse(dateStr));
  }

  onDropdownSelectedForDependentKeys(currentData: any, dependentKeys: any[]) {
    console.log(currentData);
    console.log(dependentKeys);

    if (currentData && dependentKeys) {
      dependentKeys.forEach(key => {
        currentData[key] = undefined;
      });
    }
  }

   // function called when user select file
   onFileSelected(event: any, key: string) {
    // of event is not undefined
    if (event.target) {
      this.file = event.target.files[0];
      this.currentData[key] = this.file.name;
    }
  }

}
