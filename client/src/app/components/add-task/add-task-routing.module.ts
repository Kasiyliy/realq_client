import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChooseCategoryComponent} from './choose-category/choose-category.component';
import {ChooseJobComponent} from './choose-job/choose-job.component';
import {AddTaskComponent} from './add-task.component';

const routes: Routes = [
    {
      path: '',
      component: AddTaskComponent,
      children: [
        {
          path: '',
          component: ChooseCategoryComponent,
        },
        {
          path: ':id',
          component: ChooseJobComponent,
        },
      ]
    },
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTaskRoutingModule {
}
