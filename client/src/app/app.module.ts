import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatGridListModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatStepperModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatChipsModule,
  MatTableModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSortModule,
} from '@angular/material';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';

import {CategoryEditComponent} from './components/categories/category-edit/category-edit.component';
import {PageNotFoundComponent} from './components/errors/page-not-found/page-not-found.component';
import {WorkersControlComponent} from './components/workers-control/workers-control.component';
import {WorkerEditComponent} from './components/workers/worker-edit/worker-edit.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {JobEditComponent} from './components/jobs/job-edit/job-edit.component';
import {WorkersComponent} from './components/workers/workers.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ThreadComponent} from './components/thread/thread.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {JobsComponent} from './components/jobs/jobs.component';
import {NavComponent} from './components/nav/nav.component';
import {ErrorInterceptor} from './interceptors/error';
import {JwtInterceptor} from './interceptors/jwt';
import {LayoutModule} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {Observable} from 'rxjs';


export class AccountTranslationLoader implements TranslateLoader {

  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

@NgModule({
  declarations: [
    WorkersControlComponent,
    PageNotFoundComponent,
    CategoryEditComponent,
    CategoriesComponent,
    WorkerEditComponent,
    JobEditComponent,
    WorkersComponent,
    ThreadComponent,
    TasksComponent,
    JobsComponent,
    AppComponent,
    NavComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    BrowserModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    FormsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      easing: 'ease-out',
      easeTime: 300,
      progressBar: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        useClass: AccountTranslationLoader,
        deps: [HttpClient],
      },
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
