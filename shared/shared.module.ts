import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { ButtonComponent } from './component/button/button.component';
import { ButtonGroupComponent } from './component/button-group/button-group.component';

@NgModule({
  declarations: [ButtonComponent, ButtonGroupComponent],
  imports: [CommonModule, ButtonModule],
  exports: [CommonModule, ButtonComponent, ButtonGroupComponent],
})
export class SharedModule {}
