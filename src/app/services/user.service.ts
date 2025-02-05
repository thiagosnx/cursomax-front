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
        }
        this.token = response.access_token;
      })
    );
  }
  public getToken():string | null{
    return this.token;
  }
}
