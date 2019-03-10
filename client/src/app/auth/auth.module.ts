import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
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
  MatProgressSpinnerModule,
  MatSelectModule, MatDialogModule, MatChipsModule, MatStepperModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    ReactiveFormsModule
  ],
})
export class AuthModule {
}
