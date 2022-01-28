import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleStoreComponent } from './single-store.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export const routes = [
  { path: '', component: SingleStoreComponent, pathMatch: 'full' }
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
  declarations: [SingleStoreComponent]
})
export class SingleStoreModule { }
