import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { AuthenticateService } from '../authenticate/authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/cuentas';
  authToken: any;
  user: any;
  cuentas: any;
  courses = [];

  constructor(public http: HttpClient,
    public authService: AuthenticateService) { }

  getCuentasAmount() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.API_URL}/amount`, { headers: headers });
  }

  getCuenta(id){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL+'/'+id, { headers: headers });
  }

  getCuentas(){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL, { headers: headers });
  }

  postCuenta(cuenta) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.post(this.API_URL, cuenta, { headers: headers });
  }

  putCuenta(cuenta) {
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.put(this.API_URL + `/${cuenta._id}`, cuenta, { headers: headers });
  }

  deleteCuenta(_id: string) {
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
    this.user = JSON.parse(user);
    return this.user;
  }

}
