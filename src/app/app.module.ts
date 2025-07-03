import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RouterModule } from '@angular/router';
// primeng
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './component/main-page/main-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { FriendPageComponent } from './component/friend-page/friend-page.component';
import { AdminSettingPageComponent } from './component/admin-setting-page/admin-setting-page.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RolePermissionPageComponent } from './component/role-permission-page/role-permission-page.component';
import { FriendPageDialogComponent } from './component/friend-page/friend-page-dialog/friend-page-dialog.component';
import { AdminSettingPageDetailComponent } from './component/admin-setting-page/admin-setting-page-detail/admin-setting-page-detail.component';
import { RolePermissionDetailPageComponent } from './component/role-permission-page/role-permission-detail-page/role-permission-detail-page.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  imports: [
    //angular feature
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    //primeng
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    TableModule,
    CheckboxModule,

    SharedModule, // ✅ Import here
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    HomePageComponent,
    FriendPageComponent,
    FriendPageDialogComponent,
    AdminSettingPageComponent,
    AdminSettingPageDetailComponent,
    RolePermissionPageComponent,
    RolePermissionDetailPageComponent,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
