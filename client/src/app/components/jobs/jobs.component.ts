import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobService} from '../../services/jobs/job.service';
import {CategoryService} from '../../services/categories/category.service';
import {Categories} from '../../models/categories';
import {Jobs} from '../../models/jobs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {JobEditComponent} from './job-edit/job-edit.component';
import {TranslateService} from '@ngx-translate/core';
import {ImagesService} from '../../services/images/images.service';
import {environment} from '../../../environments/environment';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  job: Jobs;
  fullUrl = environment.apiUrl + 'api/images/';
  categories: Categories[] = [];
  jobs: Jobs[] = [];
  jobForm: FormGroup;

  files;
  loading = false;

  dataSource: MatTableDataSource<Jobs>;
  displayedColumns = ['id', 'name', 'category', 'actions'];

  constructor(private breakpointObserver: BreakpointObserver,
              private translateService: TranslateService,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private imagesService: ImagesService,
              private jobService: JobService,
              private builder: FormBuilder,
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
    this.loading = true;
    this.categoryService.getAll().pipe(mergeMap(
      (resp) => {
        this.categories = resp;
        return this.jobService.getAll();
      })
    ).subscribe(resp => {

      this.jobs = resp;
      this.dataSource = new MatTableDataSource<Jobs>(resp);
      this.loading = false;

    }, err => {
      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });
      console.log(err);
      this.loading = false;
    });
  }

  uploadFile($event) {
    if ($event.target.files.length > 0) {
      this.files = $event.target.files[0];
    } else {
      this.files = null;
    }
  }

  public save() {
    this.loading = true;
    const job = new Jobs();
    job.name = this.jobForm.get('name').value;
    job.category = this.categories.find(c => c.id === parseInt(this.jobForm.get('category').value, 10));
    this.jobService.save(job).toPromise().then(resp => {

      if (this.files) {
        const formData = new FormData();
        formData.append('file', this.files);
        formData.append('jobId', resp.id + '');
        console.log(resp);
        this.imagesService.save(formData).subscribe(perf => {
          this.toastrService.success('Image uploaded!');
          this.files = null;
        });
      }

      this.jobs.unshift(resp);

      this.translateService.get('Element created!')
        .subscribe(perf => {
          this.toastrService.success(perf);
        });

      this.dataSource.data = this.jobs;
      this.jobForm.reset();
      this.loading = false;
    }, error => {
      console.log(error);

      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
          this.loading = false;
        });
    });

  }

  public delete(job: Jobs) {
    this.loading = true;
    this.jobService.delete(job).toPromise().then(resp => {
      this.jobs = this.jobs.filter(c => c !== job);
      this.loading = false;
      this.dataSource.data = this.jobs;
      this.translateService.get('Element deleted!')
        .subscribe(perf => {
          this.toastrService.success(perf);
        });

    }, error => {
      this.loading = false;
      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });

      console.log(error);
    });
  }

}

