import {Component, OnInit} from '@angular/core';
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
    this.authService.authorized.next(false);
    this.authService.role.next(null);
    this.authService.removeAll();
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
