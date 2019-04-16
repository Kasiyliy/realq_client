import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {NavComponent} from './components/nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {JobsComponent} from './components/jobs/jobs.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoriesComponent} from './components/categories/categories.component';
import {CategoryEditComponent} from './components/categories/category-edit/category-edit.component';
import {ToastrModule} from 'ngx-toastr';
import {JobEditComponent} from './components/jobs/job-edit/job-edit.component';
import {WorkersComponent} from './components/workers/workers.component';
import {WorkerEditComponent} from './components/workers/worker-edit/worker-edit.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {ThreadComponent} from './components/thread/thread.component';
import {WorkersControlComponent} from './components/workers-control/workers-control.component';
import {PageNotFoundComponent} from './components/errors/page-not-found/page-not-found.component';
import {ErrorInterceptor} from './interceptors/error';
import {JwtInterceptor} from './interceptors/jwt';
import { CommonModule } from '@angular/common';

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
    ThreadComponent,
    WorkersControlComponent,
    PageNotFoundComponent

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
    MatProgressSpinnerModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      easing: 'ease-out',
      easeTime: 300,
      progressBar: true
    })
  ],
  exports: [
    MatButtonModule,
  ],
  entryComponents: [CategoryEditComponent, JobEditComponent, WorkerEditComponent],
  providers: [
    HttpClient,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
