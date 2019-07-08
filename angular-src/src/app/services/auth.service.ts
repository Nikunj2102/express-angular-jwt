import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  serverUrl: string = '192.168.1.10:3000';

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

  storeUserData(token , user) {
    localStorage.setItem('id_token' , 'token');
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
