import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleJobComponent } from './single-job.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export const routes = [
  { path: '', component: SingleJobComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [SingleJobComponent]
})
export class SingleJobModule { }
