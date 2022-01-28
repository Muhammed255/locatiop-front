import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleOfferComponent } from './single-offer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';
import { UserOffersService } from 'src/app/services/user-offers.service';

export const routes = [
  { path: '', component: SingleOfferComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    CountdownTimerModule
  ],
  declarations: [SingleOfferComponent],
  providers: [UserStoreAdminsService, UserOffersService]
})
export class SingleOfferModule { }
