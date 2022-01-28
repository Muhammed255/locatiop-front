import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthProfileComponent } from './auth-profile.component';


export const routes = [
  { path: '', component: AuthProfileComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthProfileComponent]
})
export class AuthProfileModule { }
