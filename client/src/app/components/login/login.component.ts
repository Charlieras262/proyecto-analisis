import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  validations = { email: {msg:'', success: false}, password: {msg:'', success: false} }
  socket: any;

  constructor(public translate: TranslateService,
    public authService: AuthenticateService,
    public router: Router) { }

  ngOnInit() {
    this.socket = ProjectVariable.socket;
  }

  onLoginUser() {
    this.translate.get('email').subscribe(res => {
      this.validations.email = this.authService.checkField(this.email, 'email', res);
    });
    this.translate.get('password').subscribe(res => {
      this.validations.password = this.authService.checkField(this.password, 'password', res);
    });
    if (this.validations.email.success && this.validations.password.success) {
      this.authService.authUserCredentials({ email: this.email, password: this.password }, 'l')
        .subscribe(res => {
          var data = JSON.parse(JSON.stringify(res));
          if (data.success) {
            this.translate.get('welcome').subscribe(res => {
              $.toaster(`${res} ${data.user.username}!`, '<i class="fa fa-check-circle"></i>', 'success');
            });
            this.authService.storeUserData(data.token, data.user);
            this.socket.emit('connected', data.user.username);
            switch (data.user.type) {
              case 'A':
                this.router.navigate(['/dashboard/0010']);
                break;
              case 'P':
                this.router.navigate(['/dashboard/0100']);
                break;
              case 'E':
                this.router.navigate(['/dashboard/1000']);
                break;
              case 'S':
                this.router.navigate(['/dashboard/0001']);
                break;
              default:
                this.router.navigate(['/home']);
                break;
            }
          } else {
            if (data.node === 'email') {
              this.translate.get('email').subscribe(res => {
                this.authService.checkIfField(data.success, 'email');
                this.authService.valField(data.success, this.translate.instant(data.msg), 'email', res);
              });
            } else {
              this.translate.get('password').subscribe(res => {
                this.authService.checkIfField(data.success, 'password');
                this.authService.valField(data.success, this.translate.instant(data.msg), 'password', res);
              });
            }
          }
        });;
    } else {
      this.translate.get('email').subscribe(res => {
        this.authService.valField(this.validations.email.success, this.validations.email.msg, 'email', res);
      });
      this.translate.get('password').subscribe(res => {
        this.authService.valField(this.validations.password.success, this.validations.password.msg, 'password', res);
      });
    }
  }
}
