import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import "@angular/localize/init"

export class ConfirmDialogData {
  message = '';

  constructor(obj?: Partial<ConfirmDialogData>) {
    Object.assign(this, obj);
  }
}

export type ConfirmDialogResult = boolean;

@Component({
  selector: 'techbir-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmDialogData
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
