import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Course } from '../models/Course';
import { Response } from '../models/Response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/curso`;

  constructor(private http: HttpClient) { }

  getCourses():Observable<Response<Course[]>>{
    return this.http.get<Response<Course[]>>(this.baseApiUrl);
  }

  getCourseById(id:number):Observable<Course>{
    return this.http.get<Course>(`${this.baseApiUrl}/${id}`);
  }
}
