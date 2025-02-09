import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../models/Course';
import { UserService } from '../../../services/user.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ){ }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getCourseById(parseInt(id!)).subscribe((course)=>{
      this.course = course;
    })
  }
  isLogged():boolean{
    return this.userService.logged();
  }
  deleteCourse(){
    // console.log(sessionStorage);
    if(this.course.id && this.isLogged()){
      this.service.deleteCourse(this.course.id).subscribe(()=>{
        this.router.navigate(['/cursos']);
      })
    }
  }

}
