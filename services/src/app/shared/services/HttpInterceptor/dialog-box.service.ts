import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'app/shared/dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {
  constructor(private dialog: MatDialog) { }
  public open(message: string, type: 'decision' | 'warning' | 'information'): Promise<boolean> {
    const isDecision = type === 'decision';
    const isWarning = type === 'warning';
    const isInformation = type === 'information';
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { message, isDecision, isWarning, isInformation },
      disableClose: true
    });
    return dialogRef.afterClosed().toPromise();
  }
}