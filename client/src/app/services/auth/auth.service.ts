import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import {Roles} from '../../models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public role: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private router: Router, private http: HttpClient, private toastService: ToastrService) {
  }


  logout() {
    this.removeAll();
    this.router.navigateByUrl('auth');
  }

  removeToken() {
    localStorage.removeItem(environment.tokenName);
  }

  removeAll() {
    this.removeRole();
    this.removeToken();
  }

  removeRole() {
    localStorage.removeItem(environment.roleName);
  }

  getToken() {
    return localStorage.getItem(environment.tokenName);
  }

  getRole() {
    return localStorage.getItem(environment.roleName);
  }

  checkAvailability(): boolean {
    const auth = localStorage.getItem(environment.tokenName);
    return !!auth;
  }

  login(login, password) {

    this.http.post(environment.apiUrl + 'login', {login, password}, {responseType: 'text'}).subscribe(
      resp => {
        const token = resp;
        const payload = jwt_decode(token);
        localStorage.setItem(environment.tokenName, token);
        localStorage.setItem(environment.roleName, payload.scopes.authority);
        this.authorized.next(true);
        this.role.next(this.getRole());
        this.router.navigateByUrl('thread');
        this.toastService.success('Welcome!');
      },
      err => {
        if (err.status === 401) {
          this.toastService.warning('Invalid login or password!');
        } else {
          this.toastService.error('Error occured! Report to system administrator!');
        }
      });

  }
}
