import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class AppDialogService {
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  openDialog(headerDialog: string, componentType: Type<any>): DynamicDialogRef {
    return (this.ref = this.dialogService.open(componentType, {
      header: headerDialog,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    }));
  }

  closeDialog(res?: any) {
    this.ref?.close(res);
  }
}
