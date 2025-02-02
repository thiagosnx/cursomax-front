import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/Course';
import { CourseService } from '../../../services/course.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses: Course[] = [];
  baseApiUrl = environment.baseApiUrl;
  newsCourses:Course[] = []

  constructor(private courseService: CourseService){ }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (items) => {
        if(Array.isArray(items)){
          items.forEach((item) => {
            if(item.dt_lcmt){
              item.dt_lcmt = new Date(item.dt_lcmt). toLocaleDateString('pt-BR');
            }
          });
          this.courses = items;
          this.newsCourses = items.filter(course => course.news === true);
        }
      }
    )
  }
}
