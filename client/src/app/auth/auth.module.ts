import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {
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
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AccountTranslationLoader, HttpLoaderFactory} from '../app.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatInputModule,
    MatSelectModule, MatDialogModule, MatChipsModule, MatStepperModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        useClass: AccountTranslationLoader,
        deps: [HttpClient],
      },
    })
  ],
})
export class AuthModule {
}
