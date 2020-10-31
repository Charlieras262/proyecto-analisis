import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  socket: any;
  username: any;

  constructor(public translateService: TranslateService,
    public authService: AuthenticateService) {
    const lang = window.navigator.language || navigator.language;
    this.translateService.setDefaultLang(lang);
  }

  ngOnInit() {
    this.socket = ProjectVariable.socket;
    this.getUsername();
  }

  getUsername() {
    if (localStorage.getItem('user')) {
      this.username = JSON.parse(localStorage.getItem('user')).username;
    }
    this.socket.on('getUsername', data => {
      this.username = data;
    });
  }

  getDashboardRoute() {
    const user = JSON.parse(localStorage.getItem('user'));
      switch (user.type) {
        case 'S':
        return '/dashboard/0001';
        case 'A':
        return '/dashboard/0010';            
        case 'P':
        return '/dashboard/0100';
        case 'E':
        return '/dashboard/1000';
        default:
          return '/login'
      }
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
