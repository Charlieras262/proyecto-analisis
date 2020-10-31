import { Injectable } from '@angular/core';
import { ProjectVariable } from 'src/app/variables/projects.variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  readonly API_URL = ProjectVariable.serverLocation + 'api/courses';
  authToken: any;
  courses: any;

  constructor(public http: HttpClient) { }

  getCourses(){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL, { headers: headers });
  }

  getCoursesAmount(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.API_URL}/amount`, { headers: headers });
  }

  getCourse(id){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.API_URL+'/'+id, { headers: headers });
  }

  createCourse(course){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.post(this.API_URL, course, { headers: headers });
  }

  deleteCourse(id){
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.delete(this.API_URL+'/'+id, { headers: headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
