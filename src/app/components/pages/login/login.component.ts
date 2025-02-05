import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit{
  form! : FormGroup;


  constructor(
    private service: UserService,
    private router : Router,
    private formBuilder: FormBuilder
  ){ }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
    })
  }
  login(){
    if(this.form.valid){
      this.service.login(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/cursos']);
        },
        error: (err) => {
          alert(err.error.error || 'Erro ao fazer login!');
        }
      });
    }
  }
}
