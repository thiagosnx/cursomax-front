import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.baseApiPHP; 
  private token : string | null = null;

  constructor(private http: HttpClient) { }
  
  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/api/login`, user, { headers })
    .pipe(
      tap(response => {
        if(!response.access_token){
          this.token = "Crendenciais inválidas";
          return;
        }
        this.token = response.access_token;
        localStorage.setItem('token', this.token!)
      })
    );
  }
  getUserLogged() : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${this.apiUrl}/api/me`, { headers })
    .pipe(
      tap(response => {
        console.log(response);
        if(!response.username){
          localStorage.removeItem('token');
          return false;
        }
        return true;
      })
    )
  }
  getToken():string | null{
    if(!this.getUserLogged()){
      localStorage.removeItem('token');
      return null;
    }
    return localStorage.getItem('token');
  }
  logged() : boolean{
    return this.getToken() !== null;
  }
  logout():void{
    localStorage.removeItem('token');
  }
}
