import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = environment.baseApiPHP; 
  private apiUrl = environment.baseApiUrl;
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
        
        sessionStorage.setItem('token', this.token!)
      })
    );
  }
  // getUserLogged() : Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `${sessionStorage.getItem('token')}`
  //   });
  //   return this.http.post<any>(`${this.apiUrl}/api/me`, { headers })
  //   .pipe(
  //     tap(response => {
  //       console.log(response);
  //       if(!response.username){
  //         sessionStorage.removeItem('token');
  //         return false;
  //       }
  //       return true;
  //     })
  //   )
  // }
  getToken():string | null{
    return sessionStorage.getItem('token');
  }
  logged() : boolean{
    return this.getToken() !== null;
  }
  logout():void{
    sessionStorage.removeItem('token');
  }
}
