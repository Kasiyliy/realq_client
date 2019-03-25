import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MatSpinner} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor(private builder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {

    this.authForm = this.builder.group({
      login : [null, Validators.required],
      password : [null, Validators.required]
    });

  }

  login() {
    const login = this.authForm.get('login').value;
    const password = this.authForm.get('password').value;
    this.authService.login(login, password);

  }

}
