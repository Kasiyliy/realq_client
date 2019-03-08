import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categories} from '../../models/categories';
import {CategoryService} from '../../services/categories/category.service';
import {Observable, of} from 'rxjs';
import {MatTableDataSource, MatTableModule, MatDialog} from '@angular/material';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: Categories;

  categoryForm: FormGroup;
  dataSource: MatTableDataSource<Categories>;
  categories: Categories[] = [];
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private builder: FormBuilder, private categoryService: CategoryService, public dialog: MatDialog,
              private toastrService: ToastrService) {
    this.categoryForm = this.builder.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getAll();
  }

  openDialog(category: Categories): void {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      width: '80%',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      this.category = result;
    });
  }

  public getAll() {
    this.categoryService.getAll().toPromise().then(resp => {
      of(resp).subscribe(categories => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource<Categories>(this.categories);
      });
    }, err => {
      this.toastrService.warning('Data not fetched');
      console.log(err);
    });
  }

  public save() {
    let category = new Categories();
    category.name = this.categoryForm.get('name').value;
    this.categoryService.save(category).toPromise().then(resp => {
      this.categoryForm.reset();
      category = resp;
      this.categories.unshift(category);
      this.toastrService.success('Category saved!');
      this.dataSource.data = this.categories;
    }, err => {
      this.toastrService.warning('Data not fetched');
      console.log(err);
    });
  }

  public delete(category: Categories) {
    this.categoryService.delete(category).toPromise().then(resp => {
      this.categories = this.categories.filter(c => c !== category);
      this.dataSource.data = this.categories;
      this.toastrService.success('Category deleted!');
    }, error => {
      this.toastrService.error('Error happened! Report to administrator!');
      console.log(error);
    });
  }

}
