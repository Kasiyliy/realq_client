import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JobsComponent} from './components/jobs/jobs.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {WorkersComponent} from './components/workers/workers.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {ThreadComponent} from './components/thread/thread.component';
import {WorkersControlComponent} from './components/workers-control/workers-control.component';
import {PageNotFoundComponent} from './components/errors/page-not-found/page-not-found.component';
import {NavComponent} from './components/nav/nav.component';
import {AuthGuard} from './guards/auth/auth.guard';

const routes: Routes = [
    {
      path: 'jobs',
      component: JobsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'categories',
      component: CategoriesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'workers',
      component: WorkersComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'workers/control',
      component: WorkersControlComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'tasks',
      component: TasksComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'thread',
      component: ThreadComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'auth',
      loadChildren: './auth/auth.module#AuthModule'
    },
    {
      path: '',
      redirectTo: 'jobs',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
