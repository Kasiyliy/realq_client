import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../services/router.animations';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  animations:
    [
      routerTransition()
    ]
})

export class AddTaskComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
