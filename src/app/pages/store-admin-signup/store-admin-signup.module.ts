import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreAdminSignupComponent } from './store-admin-signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

export const routes = [
  { path: '', component: StoreAdminSignupComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StoreAdminSignupComponent]
})
export class StoreAdminSignupModule { }
