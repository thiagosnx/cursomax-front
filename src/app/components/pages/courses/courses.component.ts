import { Component } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/Course';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];
  allCourses: Course[] = [];
  baseApiUrl = environment.baseApiUrl;

  constructor(private courseService: CourseService){ }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (items) => {
        if(Array.isArray(items)){
          items.forEach((item) => {
            if(item.dt_lcmt){
              item.dt_lcmt = new Date(item.dt_lcmt).toLocaleDateString('pt-BR');
            }
          });
          this.courses = items;
          this.allCourses = items;
        }
      }
    )
  }
  searchTerm = "";

  search(e:Event):void{
    const target= e.target as HTMLInputElement
    const value = target.value

    this.courses = this.courses.filter((course)=>{
      return course.ttl.toLowerCase().includes(value);
    })
  }
}
