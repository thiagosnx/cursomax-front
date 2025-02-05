import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CoursesComponent } from './components/pages/courses/courses.component';
import { CourseComponent } from './components/pages/course/course.component';
import { NewCourseComponent } from './components/pages/new-course/new-course.component';
import { UpdateCourseComponent } from './components/pages/update-course/update-course.component';
import { DeleteCourseComponent } from './components/pages/delete-course/delete-course.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cursos', component: CoursesComponent},
  {path: 'curso/:id', component: CourseComponent},
  {path: 'cursos/editar/:id', component: UpdateCourseComponent},
  {path: 'cursos/excluir/:id', component: DeleteCourseComponent},
  {path: 'cursos/novo', component: NewCourseComponent},
  {path: 'auth/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
