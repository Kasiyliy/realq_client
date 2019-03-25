import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categories} from '../../../models/categories';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Workers} from '../../../models/workers';
import {CategoryService} from '../../../services/categories/category.service';
import {ToastrService} from 'ngx-toastr';
import {WorkersService} from '../../../services/workers/workers.service';
import {JobService} from '../../../services/jobs/job.service';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css']
})
export class WorkerEditComponent implements OnInit {

  workerEditForm: FormGroup;
  jobs: Categories[];

  constructor(public dialogRef: MatDialogRef<WorkerEditComponent>,
              @Inject(MAT_DIALOG_DATA) public worker: Workers, private builder: FormBuilder,
              private workerService: WorkersService, private jobService: JobService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {

    this.workerEditForm = this.builder.group({
      name: [null, Validators.required],
      login: [null, Validators.required],
      jobs: [null, Validators.required],
    });

    this.jobService.getAll().subscribe(jobs => {
      this.jobs = jobs;
    });

  }


  onNoClick(): void {
    this.workerService.getById(this.worker.id).toPromise().then(perf => {
      this.worker.jobs = perf.jobs;
      this.worker.password = perf.password;
      this.worker.login = perf.login;
      this.worker.name = perf.name;
    });
    this.dialogRef.close();
  }

  update() {
    this.worker.name = this.workerEditForm.get('name').value;
    this.worker.login = this.workerEditForm.get('login').value;
    this.worker.jobs = this.workerEditForm.get('jobs').value;
    this.workerService.update(this.worker).toPromise().then(resp => {
      this.dialogRef.close();
      this.toastrService.success('Worker updated!');
    }, error => {
      console.log(error);
      this.toastrService.error('Error happened! Report to administrator!');
    });
  }

  compareWithFunc(a, b) {
    return a.id === b.id;
  }
}
