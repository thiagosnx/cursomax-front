import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getCourses(page: number, limit:number):Observable<Response<Course[]>>{

    // /posts?_page=7&_limit=10
    let params = new HttpParams()
      .set("_page", page)
      .set("_limit", limit)
    return this.http.get<Response<Course[]>>(this.baseApiUrl, {params:params});
  }

  getCourseById(id:number):Observable<Course>{
    return this.http.get<Course>(`${this.baseApiUrl}/${id}`);
  }

  createCourse(course: Course):Observable<Course>{
    return this.http.post<Course>(this.baseApiUrl, course);
  }

  updateCourse(course: Course):Observable<Response<Course>> {
    return this.http.put<Response<Course>>(`${this.baseApiUrl}/${course.id}`, course);
  }

  deleteCourse(id:number):Observable<Course>{
    return this.http.delete<Course>(`${this.baseApiUrl}/${id}`)
  }
}
