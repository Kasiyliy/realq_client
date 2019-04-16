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
import {AdminGuard} from './guards/roles/admin.guard';
import {ManagerGuard} from './guards/roles/manager.guard';
import {GuestGuard} from './guards/roles/guest.guard';

const routes: Routes = [
    {
      path: 'jobs',
      component: JobsComponent,
      canActivate: [AuthGuard, AdminGuard],
    },
    {
      path: 'categories',
      component: CategoriesComponent,
      canActivate: [AuthGuard, AdminGuard],
    },
    {
      path: 'workers',
      component: WorkersComponent,
      canActivate: [AuthGuard, AdminGuard],
    },
    {
      path: 'workers/control',
      component: WorkersControlComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'tasks',
      component: TasksComponent,
    },
    {
      path: 'thread',
      component: ThreadComponent,
    },
    {
      path: 'auth',
      loadChildren: './auth/auth.module#AuthModule'
    },
    {
      path: '',
      redirectTo: 'thread',
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
