import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/Course';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent implements OnInit {
  course: Course = {
    "ttl": "",
    "dt_lcmt": "",
    "dett":"",
    "cghr": "",
    "img": "",
    "url": "",
    "tip": 1,
    "ntc": true,
    "emp": "",
  }

  constructor(
    private service:CourseService,
    private router: Router
  ){ }

  ngOnInit(): void {
      
  }
  createCourse(){
    this.service.createCourse(this.course).subscribe(()=>{
      this.router.navigate(['/cursos'])
    })
  }
}
