import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.css']
})
export class ModuleHeaderComponent {

  @Input() moduleName: string = 'Space For Module Name';
  @Input() buttons: { addButton: boolean, activateButton: boolean } = { addButton: true, activateButton: true }

  @Output() backButtonClicked = new EventEmitter();
  @Output() addButtonClicked = new EventEmitter();
  @Output() activateButtonClicked = new EventEmitter();

  constructor() { }

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
