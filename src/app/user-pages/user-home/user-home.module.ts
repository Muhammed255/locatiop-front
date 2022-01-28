import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home.component';
import { UserLocationMapModule } from '../user-location-map/user-location-map.module';


export const routes = [
  { path: '', component: UserHomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    UserLocationMapModule
  ],
  declarations: [UserHomeComponent]
})
export class UserHomeModule { }
