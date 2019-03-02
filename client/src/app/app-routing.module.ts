import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JobsComponent} from './components/jobs/jobs.component';
import {JobComponent} from './components/jobs/job/job.component';

const routes: Routes = [
    {
      path: 'jobs',
      component: JobsComponent
    },
    {
      path: 'job',
      component: JobComponent
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
