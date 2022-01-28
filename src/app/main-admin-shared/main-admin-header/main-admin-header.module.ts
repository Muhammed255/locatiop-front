import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminHeaderComponent } from './main-admin-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [MainAdminHeaderComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule
  ],
  exports: [MainAdminHeaderComponent]
})
export class MainAdminHeaderModule { }
