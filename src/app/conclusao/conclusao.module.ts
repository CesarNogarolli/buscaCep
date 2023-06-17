import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConclusaoPageRoutingModule } from './conclusao-routing.module';

import { ConclusaoPage } from './conclusao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConclusaoPageRoutingModule
  ],
  declarations: [ConclusaoPage]
})
export class ConclusaoPageModule {}
