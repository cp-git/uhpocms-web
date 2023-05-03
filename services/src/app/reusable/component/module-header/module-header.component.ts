import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.css']
})
export class ModuleHeaderComponent {

  @Input() moduleName: string = 'Space For Module Name';
  @Input() buttons: { showAddButton: boolean, showActivateButton: boolean } = { showAddButton: true, showActivateButton: true }
  @Input() titleWithUserRole: boolean = false;

  @Output() backButtonClicked = new EventEmitter();
  @Output() addButtonClicked = new EventEmitter();
  @Output() activateButtonClicked = new EventEmitter();

  userRole: any;
  constructor() {
    this.userRole = sessionStorage.getItem('userRole');
  }

  back() {
    this.backButtonClicked.emit();
  }

  // for navigating to add screen
  onAddClick() {
    this.addButtonClicked.emit();
  }

  // for navigating to activate screen
  onActivateClick() {
    this.activateButtonClicked.emit();
  }


}
