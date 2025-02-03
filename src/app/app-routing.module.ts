import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CoursesComponent } from './components/pages/courses/courses.component';
import { CourseComponent } from './components/pages/course/course.component';
import { NewCourseComponent } from './components/pages/new-course/new-course.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cursos', component: CoursesComponent},
  {path: 'curso/:id', component: CourseComponent},
  {path: 'cursos/novo', component: NewCourseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
