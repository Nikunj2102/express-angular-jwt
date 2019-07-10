import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  serverUrl: string = 'localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(user):any {
    let headers = new HttpHeaders();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(`http://${this.serverUrl}/users/register` , user , {headers: headers});    
  }

  authenticateUser(user):any {
    let headers = new HttpHeaders();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(`http://${this.serverUrl}/users/authenticate` , user , {headers: headers});
  }

  getProfile(): Observable<any> {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization' , this.authToken);
    headers.append('Content-Type' , 'application/json');
    return this.http.get(`http://${this.serverUrl}/users/profile` , {headers: headers});
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token , user) {
    localStorage.setItem('id_token' , token);
    localStorage.setItem('user' , JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
