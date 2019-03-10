import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JobsComponent} from './components/jobs/jobs.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {WorkersComponent} from './components/workers/workers.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {ThreadComponent} from "./components/thread/thread.component";

const routes: Routes = [
    {
      path: 'jobs',
      component: JobsComponent
    },
    {
      path: 'categories',
      component: CategoriesComponent
    },
    {
      path: 'workers',
      component: WorkersComponent
    },
    {
      path: 'tasks',
      component: TasksComponent
    },
    {
      path: 'thread',
      component: ThreadComponent
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
