import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/Course';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent implements OnInit {
 
  form!: FormGroup;

  constructor(
    private service:CourseService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){ }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        ttl: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        dt_lcmt: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        dett: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        cghr: ['', Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])],
        img: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        url: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        tip: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        ntc: ['', Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])],
        emp: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
      })
  }
  createCourse(){
    if(this.form.valid){
      this.service.createCourse(this.form.value).subscribe(()=>{
        this.router.navigate(['/cursos'])
      })
    }
  }
}
