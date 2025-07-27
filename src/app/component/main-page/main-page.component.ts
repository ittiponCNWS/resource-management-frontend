import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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

  constructor(private _router: Router, private _route: ActivatedRoute) {
    this.items = [
      {
        label: 'Home',
        routerLink: '/main/home',
        command: () => {
          this.titleName = 'Home';
        },
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Friend',
        routerLink: '/main/friend',
        command: () => {
          this.titleName = 'Friend';
        },
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Role Permission',
        routerLink: '/main/role-permission',
        command: () => {
          this.titleName = 'Role Permission';
        },
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Admin Setting',
        routerLink: '/main/admin-setting',
        command: () => {
          this.titleName = 'Admin Setting';
        },
        routerLinkActiveOptions: { exact: true },
      },
      { label: 'Role Permission 1' },
      { label: 'Role Permission 2' },
      { label: 'Role Permission 3' },
      { label: 'Role Permission 4' },
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
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
