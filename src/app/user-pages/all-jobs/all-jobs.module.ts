import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllJobsComponent } from './all-jobs.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export const routes = [
  { path: '', component: AllJobsComponent, pathMatch: 'full' }
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
  declarations: [AllJobsComponent]
})
export class AllJobsModule { }
