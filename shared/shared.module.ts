import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { ButtonComponent } from './component/button/button.component';
import { ButtonGroupComponent } from './component/button-group/button-group.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [ButtonComponent, ButtonGroupComponent],
  imports: [CommonModule, ButtonModule, DynamicDialogModule],
  exports: [CommonModule, ButtonComponent, ButtonGroupComponent],
  providers: [DialogService],
})
export class SharedModule {}
