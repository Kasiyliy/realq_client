import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import {Roles} from '../../models/roles';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public role: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private toastService: ToastrService,
    private translate: TranslateService,
    private http: HttpClient,
    private router: Router,
  ) {
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
        this.translate.get('Welcome').subscribe(perf => {
          this.toastService.success(perf);
        });

      },
      err => {
        this.translate.get('Invalid login or password!').subscribe(perf => {
          this.toastService.warning(perf);
        });
      });

  }
}
