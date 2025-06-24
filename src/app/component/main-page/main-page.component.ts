import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  sidebarVisible = true;
  items: MenuItem[] | undefined;
  titleName: string = 'Home';
  userName: string = 'Ittipon Chinawangso';

  constructor() {
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
  }

  onVisibleChange() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
