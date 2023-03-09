import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewAllService {
  // current module
  viewOf: any
  // table data
  tableHeader: any;

  // current all data
  tableData: any;

  // current single data
  currentData: any;
  currentIdColumnName: any;

  // for dropdown
  optionsArray1: any;
  dropdownColumnId1: any;
  dropdownColumnName1: any;

  constructor() { }
}
