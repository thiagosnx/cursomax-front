import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contribution, Donation } from '../models/Contribution';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http:HttpClient, private userService: UserService) { }

  isLogged():boolean{
    return this.userService.logged();
  }
  getContributions():Observable<Contribution[]> | null{
    if(this.isLogged()){
      return this.http.get<Contribution[]>(`${this.baseApiUrl}/api/contribuicoes`)
    }
    return null;
    
  }
  createContribution(contribution : Contribution):Observable<Contribution>{
    return this.http.post<Contribution>(`${this.baseApiUrl}/api/contribuicoes`, contribution)
  }

  getDoacoes():Observable<Donation[]> | null {
    if(this.isLogged()){
      return this.http.get<Donation[]>(`${this.baseApiUrl}/api/doacoes`)
    }
    return null;
  }
  createDonation(donation: Donation): Observable<Donation>{
    return this.http.post<Donation>(`${this.baseApiUrl}/api/doacoes`, donation)
  }
}
