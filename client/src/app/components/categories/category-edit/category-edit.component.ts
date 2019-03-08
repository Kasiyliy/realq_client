import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Categories} from '../../../models/categories';
import {MatTableDataSource, MatTableModule, MatDialog} from '@angular/material';
import {FormGroup, FormBuilder, FormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/categories/category.service';
import {ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryEditForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryEditComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Categories, private builder: FormBuilder,
              private categoryService: CategoryService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.categoryEditForm = this.builder.group({
      name: [null, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.category.name = this.categoryEditForm.get('name').value;
    this.categoryService.update(this.category).toPromise().then(resp => {
      this.dialogRef.close();
      this.toastrService.success('Category updated!');
    }, error => {
      console.log(error);
      this.toastrService.error('Error happened! Report to administrator!');
    });
  }
}
