import { Injectable } from '@angular/core';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/teachers';
  authToken: any;
  user: any;
  teachers: any;

  constructor(public http: HttpClient) { }

  getTeachersAmount() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.API_URL}/amount`, { headers: headers });
  }

  getTeachers(){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL, { headers: headers });
  }

  postTeacher(teacher) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.post(this.API_URL, teacher, { headers: headers });
  }

  putTeacher(teacher) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.put(this.API_URL + `/${teacher._id}`, teacher, { headers: headers });
  }

  deleteTeacher(_id) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.delete(this.API_URL + `/${_id}`, { headers: headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.user = user;
  }
}
