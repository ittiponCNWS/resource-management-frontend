import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RouterModule } from '@angular/router';
// primeng
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    //angular feature
    BrowserModule,
    ReactiveFormsModule,

    //primeng
    CardModule,
    InputTextModule,
    PasswordModule,

    RouterModule.forRoot(routes),
  ],
  declarations: [AppComponent, LoginPageComponent],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
