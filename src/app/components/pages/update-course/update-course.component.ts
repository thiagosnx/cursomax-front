import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/Course';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute,
    private service: CourseService,
  ){ }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get("id");
      this.service.getCourseById(parseInt(id!)).subscribe((course) => {
        this.course = course;
      })
  }

  updateCourse(){
    this.service.updateCourse(this.course).subscribe(()=>{
      this.router.navigate(['/cursos']);
    })
  }

  cancel(){
    this.router.navigate(['/cursos']);
  }
}
