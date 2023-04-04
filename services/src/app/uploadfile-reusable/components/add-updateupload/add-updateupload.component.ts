import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-updateupload',
  templateUrl: './add-updateupload.component.html',
  styleUrls: ['./add-updateupload.component.css']
})
export class AddUpdateuploadComponent {

  // data coming from parent component
  @Input() data: { currentData: any, columnNames: any } = { currentData: null, columnNames: null };
  @Input() dropdown1?: { optionsArray1: any, dropdownColumnId1: string, dropdownColumnName1: string };
  @Input() dropdown2?: { optionsArray2: any, dropdownColumnId2: string, dropdownColumnName2: string };
  @Input() dropdown?: any
  // event for parent component 
  // @Output() submitClicked: EventEmitter<any> = new EventEmitter();
  // @Output() submitClicked: EventEmitter<any, any> = new EventEmitter<any, any>();
  @Output() submitClicked: EventEmitter<any> = new EventEmitter();
  @Output() sentFileData: EventEmitter<FileList> = new EventEmitter();

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

  files!: FileList;

  constructor(
  ) { }



  onSubmitClicked(objectData: any): void {

    // console.log("emit " + (JSON.stringify(objectData)));

    this.submitClicked.emit(objectData);
  }

  ngOnInit(): void {

    // assigning variable coming from parent to local variables
    this.columnNames = this.data.columnNames;
    this.currentData = this.data.currentData
    this.initialiseDropdownData();
  }

  initialiseDropdownData() {
    if (this.dropdown1?.optionsArray1 != undefined) {
      this.optionsArray1 = this.dropdown1?.optionsArray1;
      this.dropdownColumnId1 = this.dropdown1?.dropdownColumnId1;
      this.dropdownColumnName1 = this.dropdown1?.dropdownColumnName1;
    }

    if (this.dropdown2?.optionsArray2 != undefined) {
      this.optionsArray2 = this.dropdown2?.optionsArray2;
      this.dropdownColumnId2 = this.dropdown2?.dropdownColumnId2;
      this.dropdownColumnName2 = this.dropdown2?.dropdownColumnName2;
    }
  }
  onFileSelected(event: Event) {
    // console.log(event);
    const input = event.target as HTMLInputElement;
    // console.log(input);
    if (input && input.files) {
      this.files = input.files;

    }
    // console.log(this.files);
    this.sentFileData.emit(this.files);

  }

  getOptionValue(value: any, column: any): string {
    const option = this.dropdown[column.arrayName].find((o: any) => o[column.columnId] === value);
    return option ? option[column.columnName] : '';
  }


}
