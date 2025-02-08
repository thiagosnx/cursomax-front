import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Course } from '../models/Course';
import { Response } from '../models/Response';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/curso`;

  constructor(private http: HttpClient, private userService: UserService) { }

  isLogged():boolean{
    return this.userService.logged();
  }
  getCourses(page: number, limit:number):Observable<Response<Course[]>>{
    // /posts?_page=7&_limit=10
    let params = new HttpParams()
      .set("_page", page)
      .set("_limit", limit)
    return this.http.get<Response<Course[]>>(this.apiUrl, {params:params})
    
  }

  getCourseById(id:number):Observable<Course>{
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course):Observable<Course>{
    if(this.isLogged()){
      return this.http.post<Course>(this.apiUrl, course);
    }
    return throwError(()=> new Error('Erro de autenticação'))
  }

  updateCourse(course: Course):Observable<Response<Course>> {
    if(this.isLogged()){
      return this.http.put<Response<Course>>(`${this.apiUrl}/${course.id}`, course);
    }
    return throwError(()=> new Error('Erro de autenticação'))
    
  }

  deleteCourse(id:number):Observable<Course>{
    if(this.isLogged()){
      return this.http.delete<Course>(`${this.apiUrl}/${id}`)
    }
    return throwError(()=> new Error('Erro de autenticação'))
  }
}
