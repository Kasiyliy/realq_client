import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {
  }


  logout() {
    this.authorized.next(false);
    this.router.navigateByUrl('auth');
  }

  login() {
    this.authorized.next(true);
    this.router.navigateByUrl('jobs');
  }
}
