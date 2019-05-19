import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/categories/category.service';
import {Categories} from '../../../models/categories';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {routerTransition} from "../../../services/router.animations";

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css'],
  animations: [
    routerTransition()
  ]
})
export class ChooseCategoryComponent implements OnInit {

  categories: Categories[];
  loading = false;

  constructor(
    private translateService: TranslateService,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.fetchAll();
  }

  fetchAll = () => {
    this.loading = true;
    this.categoryService.getAll().subscribe(resp => {
      this.categories = resp;
      this.loading = false;
    }, err => {

      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });
      this.loading = false;
    });
  }

}
