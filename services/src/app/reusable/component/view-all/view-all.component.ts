import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {
  @Input() data: { moduleData: any, columnNames: any } = { moduleData: null, columnNames: null };
  @Input() idsColumnName: { columnName: string } = { columnName: '' };
  @Input() isViewAllScreen?: boolean = false;
  @Input() isActivateScreen?: boolean = false;
  @Input() buttons: { updateButton: boolean, deleteButton: boolean } = { updateButton: false, deleteButton: false }
  @Input() dropdown1?: { optionsArray1: any, dropdownColumnId1: string, dropdownColumnName1: string };
  @Input() dropdown2?: { optionsArray2: any, dropdownColumnId2: string, dropdownColumnName2: string };

  @Input() dropdown?: any;
  @Output() viewClicked: EventEmitter<any> = new EventEmitter();
  @Output() updateClicked: EventEmitter<any> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<any> = new EventEmitter();
  @Output() activateClicked: EventEmitter<any> = new EventEmitter();

  columnNames: any;
  tableData: any[] = [];
  currentIdColumnName: any;
  objectToUpdate: any;

  // for dropdown
  optionsArray1: any;
  dropdownColumnId1: any;
  dropdownColumnName1: any;

  // for dropdown
  optionsArray2: any;
  dropdownColumnId2: any;
  dropdownColumnName2: any;

  constructor(
    private location: Location,
  ) { }

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

  ngOnInit(): void {

    this.currentIdColumnName = this.idsColumnName;
    this.columnNames = this.data.columnNames;
    this.tableData = this.data.moduleData;

    this.initialiseDropdownData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.tableData = this.data.moduleData;
    }
  }

  onViewClicked(objectToView: any): void {
    this.viewClicked.emit(objectToView);
  }

  onUpdatClicked(objectToUpdate: any): void {
    this.updateClicked.emit(objectToUpdate);
  }

  onDeleteClicked(objectToDelete: any): void {
    this.deleteClicked.emit(objectToDelete);
  }

  onActivateClicked(objectToActivate: any): void {
    this.activateClicked.emit(objectToActivate);
  }

  home() {
    this.location.back();
  }

  keepOrder = (a: any, b: any) => {
    return a;
  }

  // sortBy(property: string) {
  //   this.tableData.sort((a, b) => a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1);
  // }

}
