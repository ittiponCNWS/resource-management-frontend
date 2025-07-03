import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from '../component/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AppDialogService {
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  openDialog(
    dialogConfig: {
      data: any | null;
      headerDialog: string;
      dialogType: 'Add' | 'Edit';
    },
    componentType: Type<any>
  ): DynamicDialogRef {
    return (this.ref = this.dialogService.open(componentType, {
      header: dialogConfig.headerDialog,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      styleClass: 'custom-dialog',
      data: dialogConfig.data,
    }));
  }

  openDeleteDialog(confirmDialogConfig: { dialogType: 'Delete' }) {
    return (this.ref = this.dialogService.open(ConfirmationDialogComponent, {
      header: 'Confirmation Dialog',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      styleClass: 'custom-dialog',
      data: confirmDialogConfig,
    }));
  }

  closeDialog(res?: any) {
    this.ref?.close(res);
  }
}
