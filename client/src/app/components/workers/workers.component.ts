import {Component, OnInit} from '@angular/core';
import {Jobs} from '../../models/jobs';
import {FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import {Workers} from '../../models/workers';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';
import {JobService} from '../../services/jobs/job.service';
import {CategoryService} from '../../services/categories/category.service';
import {ToastrService} from 'ngx-toastr';
import {TasksService} from '../../services/tasks/tasks.service';
import {WorkersService} from '../../services/workers/workers.service';
import {WorkerEditComponent} from './worker-edit/worker-edit.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  worker: Workers;

  workers: Workers[] = [];
  jobs: Jobs[] = [];
  workerForm: FormGroup;

  dataSource: MatTableDataSource<Workers>;
  displayedColumns = ['id', 'name', 'login', 'jobs', 'actions'];

  constructor(private breakpointObserver: BreakpointObserver, private builder: FormBuilder,
              private jobService: JobService, private taskService: TasksService,
              private toastrService: ToastrService, private dialog: MatDialog,
              private workerService: WorkersService) {
  }

  ngOnInit() {

    this.getAll();

    this.workerForm = this.builder.group({
      name: [null, Validators.required],
      login: [null, Validators.required],
      jobs: [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  openDialog(worker: Workers): void {
    const dialogRef = this.dialog.open(WorkerEditComponent, {
      width: '80%',
      data: worker
    });

    dialogRef.afterClosed().subscribe(result => {
      this.worker = result;
    });
  }

  public getAll() {
    this.jobService.getAll().subscribe(resp => {
      this.jobs = resp;
    }, error => {
      this.toastrService.error('Error happened! Report to administrator!');
      console.log(error);
    });

    this.workerService.getAll().subscribe(resp => {
      this.workers = resp;
      this.dataSource = new MatTableDataSource<Workers>(resp);
    }, error => {
      this.toastrService.error('Error happened! Report to administrator!');
      console.log(error);
    });
  }

  public save() {
    const worker = new Workers();
    worker.login = this.workerForm.get('login').value;
    worker.name = this.workerForm.get('name').value;
    worker.password = this.workerForm.get('password').value;
    worker.jobs = this.workerForm.get('jobs').value;
    worker.task = null;
    this.workerService.save(worker).toPromise().then(resp => {
      this.workers.unshift(resp);
      this.toastrService.success('Worker saved!');
      this.dataSource.data = this.workers;
      this.workerForm.reset();
    }, error => {
      this.toastrService.error('Error happened! Report to administrator!');
      console.log(error);
    });
  }


  public delete(worker: Workers) {
    this.workerService.delete(worker).toPromise().then(resp => {
      this.workers = this.workers.filter(c => c !== worker);
      this.dataSource.data = this.workers;
      this.toastrService.success('Worker deleted!');
    }, error => {
      this.toastrService.error('Error happened! Report to administrator!');
      console.log(error);
    });
  }

}
