import { Injectable } from '@angular/core';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/assignments';
  authToken: any;
  assigns: any;

  constructor(public http: HttpClient) { }

  getAssign(){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL, { headers: headers });
  }

  createAssign(assign){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.post(this.API_URL, assign, { headers: headers });
  }

  deleteAssign(id){
    console.log(this.API_URL+'/'+id)
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.delete(this.API_URL+'/'+id, { headers: headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
