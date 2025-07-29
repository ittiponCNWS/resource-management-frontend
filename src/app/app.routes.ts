import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { FriendPageComponent } from './component/friend-page/friend-page.component';
import { AdminSettingPageComponent } from './component/admin-setting-page/admin-setting-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { RolePermissionPageComponent } from './component/role-permission-page/role-permission-page.component';
import { AdminSettingPageDetailComponent } from './component/admin-setting-page/admin-setting-page-detail/admin-setting-page-detail.component';
import { RolePermissionDetailPageComponent } from './component/role-permission-page/role-permission-detail-page/role-permission-detail-page.component';
import { authGuard } from '../../shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomePageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'friend',
        component: FriendPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'role-permission',
        component: RolePermissionPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'role-permission/role-permission-detail-page',
        component: RolePermissionDetailPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'admin-setting',
        component: AdminSettingPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'admin-setting/admin-setting-page-detail',
        component: AdminSettingPageDetailComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [],
  exports: [],
})
export class AppRoutingModule {}
