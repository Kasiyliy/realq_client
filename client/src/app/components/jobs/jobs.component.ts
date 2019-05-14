import {Component, OnInit} from '@angular/core';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {JobService} from '../../services/jobs/job.service';
import {CategoryService} from '../../services/categories/category.service';
import {Categories} from '../../models/categories';
import {Jobs} from '../../models/jobs';
import {ToastrService} from 'ngx-toastr';
import {MatTableDataSource, MatTableModule, MatDialog} from '@angular/material';
import {JobEditComponent} from './job-edit/job-edit.component';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  job: Jobs;

  categories: Categories[] = [];
  jobs: Jobs[] = [];
  jobForm: FormGroup;


  dataSource: MatTableDataSource<Jobs>;
  displayedColumns = ['id', 'name', 'category', 'actions'];

  constructor(private breakpointObserver: BreakpointObserver,
              private builder: FormBuilder,
              private jobService: JobService,
              private translateService: TranslateService,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {

  }

  openDialog(job: Jobs): void {
    const dialogRef = this.dialog.open(JobEditComponent, {
      width: '80%',
      data: job
    });

    dialogRef.afterClosed().subscribe(result => {
      this.job = result;
    });
  }

  ngOnInit(): void {

    this.getAll();

    this.jobForm = this.builder.group({
      name: [null, Validators.required],
      category: [null, Validators.required]
    });
  }

  public getAll() {
    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp;
    }, error => {
      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });
      console.log(error);
    });

    this.jobService.getAll().subscribe(resp => {
      this.jobs = resp;
      this.dataSource = new MatTableDataSource<Jobs>(resp);
    }, error => {

      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });

      console.log(error);
    });
  }

  public save() {
    const job = new Jobs();
    job.name = this.jobForm.get('name').value;
    job.category = this.categories.find(c => c.id === parseInt(this.jobForm.get('category').value, 10));
    this.jobService.save(job).toPromise().then(resp => {
      this.jobs.unshift(resp);

      this.translateService.get('Element created!')
        .subscribe(perf => {
          this.toastrService.success(perf);
        });

      this.dataSource.data = this.jobs;
      this.jobForm.reset();
    }, error => {
      console.log(error);

      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });
    });

  }

  public delete(job: Jobs) {
    this.jobService.delete(job).toPromise().then(resp => {
      this.jobs = this.jobs.filter(c => c !== job);
      this.dataSource.data = this.jobs;

      this.translateService.get('Element deleted!')
        .subscribe(perf => {
          this.toastrService.success(perf);
        });

    }, error => {

      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });

      console.log(error);
    });
  }

}

