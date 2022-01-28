import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResendConfirmationComponent } from './resend-confirmation.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

export const routes = [
  { path: '', component: ResendConfirmationComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ResendConfirmationComponent]
})
export class ResendConfirmationModule { }
