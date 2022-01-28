import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAdminFooterComponent } from './main-admin-footer.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [MainAdminFooterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [MainAdminFooterComponent]
})
export class MainAdminFooterModule { }
