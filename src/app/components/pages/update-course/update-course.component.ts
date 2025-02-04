import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/Course';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit {
  
  form!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CourseService,
    private formBuilder: FormBuilder,
  ){ }
  courseId = 0;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      ttl : '',
      dt_lcmt: '',
      dett: '',
      cghr: '',
      img: '',
      url: '',
      tip: '',
      ntc: '',
      emp: ''
    });
    const id = this.route.snapshot.paramMap.get('id') 
    this.courseId = parseInt(id!);
      this.service.getCourseById(parseInt(id!)).subscribe((course) => {
        this.form = this.formBuilder.group({
          id:[course.id],
            
          ttl: [course.ttl, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          dt_lcmt: [course.dt_lcmt, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          dett: [course.dett, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          cghr: [course.cghr, Validators.compose([
            Validators.required,
            Validators.minLength(1)
          ])],
          img: [course.img, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          url: [course.url, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          tip: [course.tip, Validators.compose([
            Validators.required,
            Validators.minLength(1)
          ])],
          ntc: [course.ntc, Validators.compose([
            Validators.required,
            Validators.minLength(1)
          ])],
          emp: [course.emp, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
        })
      })
      
  }

  updateCourse(){
    if(this.form.valid){
      this.service.updateCourse(this.form.value).subscribe(()=>{
        this.router.navigate(['/cursos']);
      })
    }
  }

  cancel(){
    this.router.navigate([`/curso/${this.courseId}`]);
  }
}
