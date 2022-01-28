import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLocationMapComponent } from './user-location-map.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBvP1Wi2PO9BoENcVOGN-t2WgLJm6Mv_yM",
      libraries: ["geometry"]
  })
  ],
  declarations: [UserLocationMapComponent],
  exports: [UserLocationMapComponent]
})
export class UserLocationMapModule { }
