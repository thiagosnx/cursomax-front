import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesComponent } from './components/pages/courses/courses.component';
import { CourseComponent } from './components/pages/course/course.component';
import { NewCourseComponent } from './components/pages/new-course/new-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCourseComponent } from './components/pages/update-course/update-course.component';
import { DeleteCourseComponent } from './components/pages/delete-course/delete-course.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ContributionComponent } from './components/pages/contribution/contribution.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    CourseComponent,
    NewCourseComponent,
    UpdateCourseComponent,
    DeleteCourseComponent,
    LoginComponent,
    ContributionComponent,
  ],
  imports: [
    CarouselModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
