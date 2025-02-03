import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../models/Course';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css'
})
export class DeleteCourseComponent implements OnInit{
  course: Course = {
    "id": 0,
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
    private http: HttpClient,
    private service: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get("id");
      this.service.getCourseById(parseInt(id!)).subscribe((course)=>{
        this.course = course;
      })
  }

  deleteCourse(){
    if(this.course.id){
      this.service.deleteCourse(this.course.id).subscribe(()=>{
        this.router.navigate(['/cursos']);
      })
    }
  }

  cancel(){
    this.router.navigate(['/cursos']);
  }
}
