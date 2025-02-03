import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/Course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{
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
    private http:HttpClient,
    private service: CourseService,
    private route: ActivatedRoute
  ){ }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getCourseById(parseInt(id!)).subscribe((course)=>{
      this.course = course;
    })
  }
}
