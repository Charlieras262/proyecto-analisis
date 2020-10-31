import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  username: string;
  email: string;
  valCode: string;
  password: string;
  valPass: string;
  validations = { username: { msg: '', success: false }, email: { msg: '', success: false }, password: { msg: '', success: false }, valPass: { msg: '', success: false } }

  constructor(public authService: AuthenticateService,
    public translate: TranslateService,
    public router: Router) { }

  ngOnInit() {
    this.translate.get('register.valPass').subscribe(res => {
      this.checkValPassField(res);
    });
  }

  onRegisterUser() {
    this.translate.get('register.username').subscribe(res => {
      this.validations.username = this.authService.checkField(this.username, 'username', res);
    });
    this.translate.get('register.email').subscribe(res => {
      this.validations.email = this.authService.checkField(this.email, 'email', res);
    });
    this.translate.get('register.password').subscribe(res => {
      this.validations.password = this.authService.checkField(this.password, 'password', res);
    });
    this.translate.get('register.valPass').subscribe(res => {
      this.checkValPassField(res);
    });

    this.translate.get('register.valPass').subscribe(res => {
      const node = document.getElementById('valPass');
      this.valPassField(res, node);
    });

    if (this.validations.username.success && this.validations.email.success && this.validations.password.success && this.validations.valPass.success) {
      this.authService.authUserCredentials({ username: this.username, email: this.email, type: 'A', password: this.password }, 'r')
      .subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        if(data.success){
          this.translate.get(data.msg).subscribe(res => {
            $.toaster(`${res}`, '<i class="fa fa-check-circle"></i>', 'success');
          });
          this.router.navigate(['/login']);
        } else {
          if(data.node == 'email'){
            this.translate.get('register.email').subscribe(res => {
              this.authService.checkIfField(data.success, 'email');
              this.authService.valFieldShow(data.success, this.translate.instant(data.msg), 'email', res);
            });
          } else if(data.node == 'valCode'){
            this.translate.get('register.valPass').subscribe(res => {
              this.authService.checkIfField(data.success, 'valCode');
              this.authService.valFieldShow(data.success, this.translate.instant(data.msg), 'valCode', res);
            });
          }else{
            this.translate.get(data.msg).subscribe(str => {
              $.toaster(`${str}`, '<i class="fa fa-times"></i>', 'danger');
            });
          }
        }
      })
    } else {
      this.translate.get('register.username').subscribe(res => {
        this.authService.valField(this.validations.username.success, this.validations.username.msg, 'username', res);
      });
      this.translate.get('register.email').subscribe(res => {
        this.authService.valField(this.validations.email.success, this.validations.email.msg, 'email', res);
      });
      this.translate.get('register.password').subscribe(res => {
        this.authService.valField(this.validations.password.success, this.validations.password.msg, 'password', res);
      });
    }
  }

  checkValPassField(fieldname) {
    const node = document.getElementById('valPass');
    node.addEventListener('input', (event) => {
      if (this.valPass === undefined || this.valPass === ' ' || this.valPass === '') {
        node.classList.remove('valid');
        node.classList.add('invalid');
        this.validations.valPass = { msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false };
      }
      if (this.password === this.valPass) {
        node.classList.remove('invalid');
        node.classList.add('valid');
        this.validations.valPass = { msg: '', success: true };
      } else {
        node.classList.remove('valid');
        node.classList.add('invalid');
        this.validations.valPass = { msg: this.translate.instant('register.compValPass'), success: false };
      }
      this.authService.valPassField(this.validations.valPass.success, this.validations.valPass.msg, 'valPass');
    })
  }

  valPassField(fieldname, node) {
    if (this.valPass === undefined || this.valPass === ' ' || this.valPass === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      this.validations.valPass = { msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false };
    }
    if (this.password === this.valPass) {
      node.classList.remove('invalid');
      node.classList.add('valid');
      this.validations.valPass = { msg: '', success: true };
    } else {
      node.classList.remove('valid');
      node.classList.add('invalid');
      this.validations.valPass = { msg: this.translate.instant('register.compValPass'), success: false };
    }
    this.authService.valField(this.validations.valPass.success, this.validations.valPass.msg, 'valPass', fieldname);
  }
}
