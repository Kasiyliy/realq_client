import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private http: HttpClient, private toastService: ToastrService) {
  }


  logout() {
    this.removeToken();
    this.router.navigateByUrl('auth');
  }

  removeToken() {
    localStorage.removeItem(environment.tokenName);
  }

  getToken() {
    return localStorage.getItem(environment.tokenName);
  }

  checkAvailability(): boolean {
    const auth = localStorage.getItem(environment.tokenName);
    return !!auth;
  }

  login(login, password) {

    this.http.post(environment.apiUrl + 'login', {login, password}, {responseType: 'text'}).subscribe(
      resp => {
        const token = resp;
        localStorage.setItem(environment.tokenName, token);
        this.authorized.next(true);
        this.router.navigateByUrl('jobs');
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
