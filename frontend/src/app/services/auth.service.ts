import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
const AUTH_API = 'https://mp2lbackinstance-gdd0dwe6ezgwf0dq.francecentral-01.azurewebsites.net/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  login(credentials: { email:any; password: any;}): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password,
    }, httpOptions);
  }
  register(user: { username: any; email: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  get isLoggedIn(): boolean {
    if (this.tokenStorage.getToken()) {
      return true;
    }
    return false;
  }
}
