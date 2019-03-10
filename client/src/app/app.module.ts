import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MAT_LABEL_GLOBAL_OPTIONS,
  MatInputModule,
  MatSelectModule, MatDialogModule, MatChipsModule, MatStepperModule
} from '@angular/material';
import {NavComponent} from './components/nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {JobsComponent} from './components/jobs/jobs.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoriesComponent} from './components/categories/categories.component';
import {CategoryEditComponent} from './components/categories/category-edit/category-edit.component';
import {ToastrModule} from 'ngx-toastr';
import {JobEditComponent} from './components/jobs/job-edit/job-edit.component';
import {WorkersComponent} from './components/workers/workers.component';
import {WorkerEditComponent} from './components/workers/worker-edit/worker-edit.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ThreadComponent } from './components/thread/thread.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    JobsComponent,
    CategoriesComponent,
    CategoryEditComponent,
    JobEditComponent,
    WorkersComponent,
    WorkerEditComponent,
    TasksComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatChipsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      closeButton: true,
      easing: 'ease-out',
      easeTime: 300,
      progressBar: true
    })
  ],
  entryComponents: [CategoryEditComponent, JobEditComponent, WorkerEditComponent],
  providers: [
    HttpClient,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
