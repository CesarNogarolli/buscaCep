import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConclusaoPage } from './conclusao.page';

const routes: Routes = [
  {
    path: '',
    component: ConclusaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConclusaoPageRoutingModule {}
