import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Categories} from '../../models/categories';
import {CategoryService} from '../../services/categories/category.service';
import {of} from 'rxjs';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';


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
  loading = false;
  constructor(private builder: FormBuilder,
              private categoryService: CategoryService,
              public dialog: MatDialog,
              private translateService: TranslateService,
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
    this.loading = true;
    this.categoryService.getAll().toPromise().then(resp => {
      of(resp).subscribe(categories => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource<Categories>(this.categories);
        this.loading = false;
      });
    }, err => {

      this.translateService.get('Data not fetched!')
        .subscribe(perf => {
          this.toastrService.warning(perf);
        });
      this.loading = false;
      console.log(err);
    });
  }

  public save() {
    this.loading = true;
    let category = new Categories();
    category.name = this.categoryForm.get('name').value;
    this.categoryService.save(category).toPromise().then(resp => {
      this.categoryForm.reset();
      category = resp;
      this.categories.unshift(category);

      this.translateService.get('Element created!')
        .subscribe(perf => {
          this.toastrService.success(perf);
        });

      this.dataSource.data = this.categories;
      this.loading = false;
    }, err => {

      this.translateService.get('Data not fetched!')
        .subscribe(perf => {
          this.toastrService.warning(perf);
        });

      console.log(err);
      this.loading = false;
    });
  }

  public delete(category: Categories) {
    this.loading = true;
    this.categoryService.delete(category).toPromise().then(resp => {
      this.categories = this.categories.filter(c => c !== category);
      this.dataSource.data = this.categories;

      this.translateService.get('Element deleted!')
        .subscribe(perf => {
          this.toastrService.success(perf);
        });
      this.loading = false;
    }, error => {

      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });

      console.log(error);
      this.loading = false;
    });
  }

}
