import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JobsComponent} from './components/jobs/jobs.component';
import {CategoriesComponent} from './components/categories/categories.component';

const routes: Routes = [
    {
      path: 'jobs',
      component: JobsComponent
    },
    {
      path: 'categories',
      component: CategoriesComponent
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
