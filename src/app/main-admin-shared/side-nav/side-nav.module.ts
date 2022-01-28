import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SideNavComponent } from './side-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule
  ],
  exports: [SideNavComponent]
})
export class SideNavModule { }
