import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from './component/button/button.component';
import { ButtonGroupComponent } from './component/button-group/button-group.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './component/form-input/form-input.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from './component/loading/loading.component';
import { InputRequireDirective } from './directive/inputRequire.directive';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './service/toast.service';
import { HttpClientModule } from '@angular/common/http';
import { HideIfClaimsNotMetDirective } from './directive/hide-if-claims-not-met.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    ButtonGroupComponent,
    FormInputComponent,
    ConfirmationDialogComponent,
    LoadingComponent,
    InputRequireDirective,
    HideIfClaimsNotMetDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    ToastModule,
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    ButtonGroupComponent,
    FormInputComponent,
    ConfirmationDialogComponent,
    LoadingComponent,
    InputRequireDirective,
    HideIfClaimsNotMetDirective,
  ],
  providers: [DialogService, MessageService, ToastService],
})
export class SharedModule {}
