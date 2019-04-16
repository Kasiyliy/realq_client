import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSidenavModule} from '@angular/material';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Roles} from '../../models/roles';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenavModule;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  roles = new Roles();

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {

  }

}
