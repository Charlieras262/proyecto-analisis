import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {


  readonly API_URL = ProjectVariable.serverLocation + 'api/institutions';
  authToken: any;
  user: any;
  institutions: any;

  constructor(public http: HttpClient) { }

  getInstitutions(){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL, { headers: headers });
  }

  getInstitutionsAmount(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.API_URL}/amount`, { headers: headers });
  }

  createInstitutions(institution){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.post(this.API_URL, institution, { headers: headers });
  }

  editInstitutions(id, institution){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.put(`${this.API_URL}/${id}`, institution, { headers: headers });
  }

  deleteInstitutions(id){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.delete(this.API_URL+'/'+id, { headers: headers });
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
