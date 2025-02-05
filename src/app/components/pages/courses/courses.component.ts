import { Component } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/Course';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses: Course[] = [];
  allCourses: Course[] = [];
  baseApiUrl = environment.baseApiUrl;
  currentPage:number = 1;
  filter:string = '';

  constructor(
    private courseService: CourseService,
    private userService: UserService
  ){ }

  ngOnInit(): void {
    this.courseService.getCourses(this.currentPage, 10).subscribe(
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

    this.courses = this.allCourses.filter((course)=>{
      return course.ttl.toLowerCase().includes(value);
    })
  }
  isLogged():boolean{
    return this.userService.logged();
  }
}
