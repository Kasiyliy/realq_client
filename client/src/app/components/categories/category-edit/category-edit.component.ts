import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Categories} from '../../../models/categories';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/categories/category.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryEditForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryEditComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Categories,
              private translateService: TranslateService,
              private builder: FormBuilder,
              private categoryService: CategoryService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.categoryEditForm = this.builder.group({
      name: [null, Validators.required]
    });
  }

  onNoClick(): void {
    this.categoryService.getById(this.category.id).toPromise().then(perf => {
      this.category.name = perf.name;
    });
    this.dialogRef.close();
  }

  update() {
    this.category.name = this.categoryEditForm.get('name').value;
    this.categoryService.update(this.category).toPromise().then(resp => {
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
