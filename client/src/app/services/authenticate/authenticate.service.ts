import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';

const jwtHelper = new JwtHelperService();
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/users';
  authToken: any;
  user: any;
  users: any;

  constructor(public http: HttpClient, public translate: TranslateService) { }


  getUsers(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.API_URL, { headers: headers });
  }

  authUserCredentials(user, flag) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(user)
    switch (flag) {
      case 'l':
        return this.http.post(this.API_URL + '/authenticate/login', user, { headers: headers });
      case 'r':
        return this.http.post(this.API_URL + '/authenticate/register', user, { headers: headers });
      default:
        break;
    }
  }

  checkField(fieldData, idInput, fieldname) {
    const node = document.getElementById(idInput);
    if (fieldData === undefined || fieldData === ' ' || fieldData === '') {
      node.classList.remove('valid');
      node.classList.add('invalid');
      return {msg: `${this.translate.instant('student.field1')} ${fieldname} ${this.translate.instant('student.field2')}`, success: false};
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
      return {msg: '', success: true};
    }
  }

  valIfFieldIsEmpty(fieldData){
    if(fieldData === undefined || fieldData === ' ' || fieldData === '' || fieldData === null){
      return false;
    } else {
      return true;
    }
  }

  valField(val, msg, id, fieldname) {
    if (!val) {
      $('#' + id).popover({
        title: 'Error',
        content: msg,
        html: false,
        trigger: 'focus'
      });
      $('#' + id).on('input', () => {
        $('#' + id).popover('hide');
        const data = this.checkField($('#' + id).children()[0].value, id, fieldname);
        this.valField(data.success, data.msg, id, fieldname);
      })
    } else {
      $('#' + id).popover('dispose');
    }
  }

  valFieldShow(val, msg, id, fieldname) {
    if (!val) {
      $('#' + id).popover({
        title: 'Error',
        content: msg,
        html: false,
        trigger: 'focus'
      });
      $('#' + id).popover('show')
      $('#' + id).on('input', () => {
        $('#' + id).popover('hide');
        const data = this.checkField($('#' + id).children()[0].value, id, fieldname);
        this.valField(data.success, data.msg, id, fieldname);
      })
    } else {
      $('#' + id).popover('dispose');
    }
  }

  valPassField(val, msg, id) {
    if (!val) {
      $('#' + id).popover({
        title: 'Error',
        content: msg,
        html: false,
        trigger: 'focus'
      });
      $('#' + id).popover('show')
    } else {
      $('#' + id).popover('dispose');
    }
  }

  valEmailFormat(email) {
    const emailNode = document.getElementById('email');
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === undefined || email === ' ' || email === '') {
      emailNode.classList.remove('valid');
      emailNode.classList.add('invalid');
      return false;
    } else {
      if (!re.test(email)) {
        emailNode.classList.remove('valid');
        emailNode.classList.add('invalid');
        return false;
      } else {
        emailNode.classList.remove('invalid');
        emailNode.classList.add('valid');
        return true;
      }
    }
  }

  deleteUser(_id) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.delete(this.API_URL + `/${_id}`, { headers: headers });
  }
  checkIfField(valid, id) {
    const node = document.getElementById(id);
    if (!valid) {
      node.classList.remove('valid');
      node.classList.add('invalid');
    } else {
      node.classList.remove('invalid');
      node.classList.add('valid');
    }
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.user = user;
    return JSON.parse(user);
  }

  loggedIn() {
    return !jwtHelper.isTokenExpired(localStorage.getItem('id_token'));
  }
}
