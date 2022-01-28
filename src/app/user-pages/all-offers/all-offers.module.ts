import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllOffersComponent } from './all-offers.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserOffersService } from 'src/app/services/user-offers.service';
import { UserCartService } from 'src/app/services/user-cart.service';
import { UserJobsService } from 'src/app/services/user-jobs.service';


export const routes = [
    { path: '', component: AllOffersComponent, pathMatch: 'full' }
  ];

@NgModule( {
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
  ],
  declarations: [ AllOffersComponent ],
  providers: [UserOffersService, UserCartService,UserJobsService]
} )
export class AllOffersModule {
}
