import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {JobService} from '../../../services/jobs/job.service';
import {Jobs} from '../../../models/jobs';
import {CategoryService} from '../../../services/categories/category.service';
import {Categories} from '../../../models/categories';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  jobEditForm: FormGroup;
  categories: Categories[];

  constructor(public dialogRef: MatDialogRef<JobEditComponent>,
              @Inject(MAT_DIALOG_DATA) public job: Jobs,
              private builder: FormBuilder,
              private jobService: JobService,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private translateService: TranslateService
              ) {
  }

  ngOnInit(): void {

    this.jobEditForm = this.builder.group({
      name: [null, Validators.required],
      category: [null, Validators.required]
    });

    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

  }


  onNoClick(): void {
    this.jobService.getById(this.job.id).toPromise().then(perf => {
      this.job.name = perf.name;
      this.job.category = perf.category;
    });
    this.dialogRef.close();
  }

  update() {
    this.job.name = this.jobEditForm.get('name').value;
    this.job.category = this.categories.find(c => c.id === parseInt(this.jobEditForm.get('category').value, 10));
    this.jobService.update(this.job).toPromise().then(resp => {
      this.dialogRef.close();
      this.translateService.get('Element updated!')
        .subscribe(perf => {
          this.toastrService.success(perf);
        });
    }, error => {
      console.log(error);
      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });
    });
  }
}
