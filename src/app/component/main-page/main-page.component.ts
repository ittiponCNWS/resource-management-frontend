import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../service/auth.service';
import { claimReq } from '../../../../shared/utils/claimReq-utils';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  sidebarVisible = true;
  items: MenuItem[] | undefined;
  cogIconMenu: MenuItem[] | undefined;
  titleName: string = 'Home';
  userName: string = 'Ittipon Chinawangso';
  claimReq = claimReq;

  constructor(private _router: Router, private _authSerivce: AuthService) {
    this.items = [
      {
        label: 'Home',
        routerLink: '/main/home',
        command: () => {
          this.titleName = 'Home';
        },
        routerLinkActiveOptions: { exact: true },
        visible: claimReq.isAnonymous(this._authSerivce.getClaims()),
      },
      {
        label: 'Friend',
        routerLink: '/main/friend',
        command: () => {
          this.titleName = 'Friend';
        },
        routerLinkActiveOptions: { exact: true },
        visible: claimReq.isAnonymous(this._authSerivce.getClaims()),
      },
      {
        label: 'Role Permission',
        routerLink: '/main/role-permission',
        command: () => {
          this.titleName = 'Role Permission';
        },
        routerLinkActiveOptions: { exact: true },
        //hide when is other role. show when is admin role
        visible: claimReq.isAdmin(this._authSerivce.getClaims()),
      },
      {
        label: 'Admin Setting',
        routerLink: '/main/admin-setting',
        command: () => {
          this.titleName = 'Admin Setting';
        },
        routerLinkActiveOptions: { exact: true },
        //hide when is other role. show when is admin role
        visible: claimReq.isAdmin(this._authSerivce.getClaims()),
      },
      {
        label: 'Page 1',
        // hide when role is admin , show when is other role
        visible: !claimReq.isAdmin(this._authSerivce.getClaims()),
      },
      {
        label: 'Page 2',
        // hide when role is admin , show when is other role
        visible: !claimReq.isAdmin(this._authSerivce.getClaims()),
      },
      {
        label: 'Page 3',
        // hide when role is admin , show when is other role
        visible: !claimReq.isAdmin(this._authSerivce.getClaims()),
      },
      {
        label: 'Page 4',
        // hide when role is admin , show when is other role
        visible: !claimReq.isAdmin(this._authSerivce.getClaims()),
      },
    ];

    this.cogIconMenu = [
      {
        label: 'Setting',
        icon: 'pi pi-sliders-h',
        command: () => {
          this.onSetting();
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.onLogout();
        },
      },
    ];
  }

  onVisibleChange() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onSetting() {
    // Handle setting logic
    console.log('Go to setting page');
  }

  onLogout() {
    // Handle logout logic
    this._authSerivce.deleteToken();
    this._router.navigate(['/login']);
  }
}
