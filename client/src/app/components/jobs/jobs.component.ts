import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {MatFormFieldModule, MatButtonModule} from '@angular/material';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  /** Based on the screen size, switch from standard to one column per row */
  constructor(private breakpointObserver: BreakpointObserver) {
  }

}

