import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  teacherSelected = { _id: '', name: '', lastName: '', user: '', password: '', valPass: '', email: '', type: ''}
  validations = {user: { msg: '', success: false }, name: { msg: '', success: false }, lastname: { msg: '', success: false }, email: { msg: '', success: false }, valPass: { msg: '', success: false }, password: { msg: '', success: false }}
  _id: string;
  user: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  valPass: string;

  constructor(public authService: AuthenticateService,
    public translate: TranslateService,
    public router: Router) { }

  ngOnInit() {
    this.translate.get('register.valPass').subscribe(res => {
      this.checkValPassField(res);
    });
  }

  createUser(form: NgForm){
    this.translate.get('register.name').subscribe(res => {
      this.validations.name = this.authService.checkField(this.name, 'name', res);
    });
    this.translate.get('register.lastname').subscribe(res => {
      this.validations.lastname = this.authService.checkField(this.lastname, 'lastname', res);
    });
    this.translate.get('register.user').subscribe(res => {
      this.validations.user = this.authService.checkField(this.user, 'user', res);
    });
    this.translate.get('register.password').subscribe(res => {
      this.validations.password = this.authService.checkField(this.password, 'password', res);
    });
    this.translate.get('register.email').subscribe(res => {
      this.validations.email = this.authService.checkField(this.email, 'email', res);
    });
    this.translate.get('register.valPass').subscribe(res => {
      this.checkValPassField(res);
    });

    this.translate.get('register.valPass').subscribe(res => {
      const node = document.getElementById('valPass');
      this.valPassField(res, node);
    });

    if(this.validations.name.success && this.validations.lastname.success && this.validations.user.success && this.validations.email.success && this.validations.password.success && this.validations.valPass.success){
      this.authService.authUserCredentials({name: this.name, lastname: this.lastname, user: this.user, password: this.password, email: this.email, type: 'A'}, 'r').subscribe(res => {
        const data = JSON.parse(JSON.stringify(res));
        if(data.success){
          this.translate.get(data.msg).subscribe(res => {
            $.toaster(`${res}`, '<i class="fa fa-check-circle"></i>', 'success');
          });
          this.router.navigate(['/dashboard/0001/']);
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
      });
    } else {
      this.translate.get('register.name').subscribe(res => {
        this.authService.valField(this.validations.name.success, this.validations.name.msg, 'name', res);
      });
      this.translate.get('register.lastname').subscribe(res => {
        this.authService.valField(this.validations.lastname.success, this.validations.lastname.msg, 'lastname', res);
      });
      this.translate.get('register.user').subscribe(res => {
        this.authService.valField(this.validations.user.success, this.validations.user.msg, 'user', res);
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
