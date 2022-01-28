import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleStoreAdminComponent } from './single-store-admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserProductsService } from 'src/app/services/user-products.service';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';


export const routes = [
  { path: '', component: SingleStoreAdminComponent, pathMatch: 'full' }
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
  declarations: [SingleStoreAdminComponent],
  providers: [UserStoreAdminsService, UserProductsService]
})
export class SingleStoreAdminModule { }
