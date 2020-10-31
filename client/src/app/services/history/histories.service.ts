import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/histories';
  authToken: any;
  user: any;

  constructor(public http: HttpClient) { }

  getHistories(group: String){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(`${this.API_URL}/${group}`, { headers: headers });
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
