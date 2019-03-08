import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableDataSource, MatTableModule, MatDialog} from '@angular/material';
import {FormGroup, FormBuilder, FormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {JobService} from '../../../services/jobs/job.service';
import {Jobs} from '../../../models/jobs';
import {CategoryService} from '../../../services/categories/category.service';
import {Categories} from '../../../models/categories';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  jobEditForm: FormGroup;
  categories: Categories[];

  constructor(public dialogRef: MatDialogRef<JobEditComponent>,
              @Inject(MAT_DIALOG_DATA) public job: Jobs, private builder: FormBuilder,
              private jobService: JobService, private categoryService: CategoryService, private toastrService: ToastrService) {
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
    this.job.category = this.categories.find(c => c.id === parseInt(this.jobEditForm.get('category').value, 10 ));
    this.jobService.update(this.job).toPromise().then(resp => {
      this.dialogRef.close();
      this.toastrService.success('Job updated!');
    }, error => {
      console.log(error);
      this.toastrService.error('Error happened! Report to administrator!');
    });
  }


}
