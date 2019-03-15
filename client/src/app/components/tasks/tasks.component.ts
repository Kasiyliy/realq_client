import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material';
import {Categories} from '../../models/categories';
import {CategoryService} from '../../services/categories/category.service';
import {ToastrService} from 'ngx-toastr';
import {Jobs} from '../../models/jobs';
import {JobService} from '../../services/jobs/job.service';
import {Tasks} from '../../models/tasks';
import {TasksService} from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  categories: Categories[];
  jobs: Jobs[];
  constructor(private builder: FormBuilder, private categoryService: CategoryService,
              private toastrService: ToastrService, private jobService: JobService,
              private taskService: TasksService) {
  }

  iinSelectForm: FormGroup;
  jobSelectForm: FormGroup;

  ngOnInit() {
    this.iinSelectForm = this.builder.group({
      iin: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]]
    });

    this.jobSelectForm = this.builder.group({
      category: ['', Validators.required],
      job: ['', Validators.required]
    });

    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp;
    }, err => {
      this.toastrService.error('Error occured! Report to site administrator!');
    });
  }

  getJobsBy(category: Categories) {
    this.jobService.getAllBy(category).subscribe(resp => {
      this.jobs = resp;
    }, err => {
      this.toastrService.error('Error occured! Report to system administrator');
    });
  }

  getJobs() {
    this.jobService.getAll().subscribe(resp => {
      this.jobs = resp;
    }, err => {
      this.toastrService.error('Error occured! Report to system administrator');
    });
  }

  submitForm() {
    if (this.jobSelectForm.valid && this.iinSelectForm.valid) {
      const task = new Tasks();
      task.iin = this.iinSelectForm.get('iin').value;
      task.job = this.jobSelectForm.get('job').value;
      this.taskService.save(task).subscribe(resp => {
        this.toastrService.success('Your number is ' + resp.id);
      });
    } else {
      this.toastrService.error('Error in form! Please rewrite form again!');
    }
  }

}
