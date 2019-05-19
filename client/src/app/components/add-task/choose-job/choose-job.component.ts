import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {CategoryService} from '../../../services/categories/category.service';
import {Categories} from '../../../models/categories';
import {JobService} from '../../../services/jobs/job.service';
import {Jobs} from '../../../models/jobs';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {routerTransition} from '../../../services/router.animations';
import {environment} from '../../../../environments/environment';
import {CategoryEditComponent} from "../../categories/category-edit/category-edit.component";
import {MatDialog} from "@angular/material";
import {EnterIINComponent} from "../enter-iin/enter-iin.component";

@Component({
  selector: 'app-choose-job',
  templateUrl: './choose-job.component.html',
  styleUrls: ['./choose-job.component.css'],
  animations: [
    routerTransition()
  ]
})
export class ChooseJobComponent implements OnInit {

  categoryId: number;
  category: Categories;
  jobs: Jobs[] = [];
  loading = false;
  imageUrl = environment.apiUrl + 'api/images/';

  constructor(
    private translateService: TranslateService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private jobService: JobService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.fetchAll();
  }

  openDialog(job: Jobs): void {
    const dialogRef = this.dialog.open(EnterIINComponent, {
      width: '80%',
      data: job
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  fetchAll = () => {
    this.loading = true;
    this.route.params.pipe(
      mergeMap(res => {
        this.categoryId = +res.id;
        return this.categoryService.getById(this.categoryId);
      }),
      mergeMap(category => {
        this.category = category;
        return this.jobService.getAllBy(this.category);
      })
    ).subscribe(jobs => {
      this.jobs = jobs;

      this.loading = false;
    }, err => {
      this.translateService.get('Error happened! Report to system administrator!')
        .subscribe(perf => {
          this.toastrService.error(perf);
        });
      this.loading = false;
    });
  }

  jobClicked() {
    alert('SALEM ');
  }

  backClicked() {
    this.location.back();
  }

}
