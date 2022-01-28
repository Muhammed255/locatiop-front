import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from './single-product.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';
import { UserProductsService } from 'src/app/services/user-products.service';


export const routes = [
  { path: '', component: SingleProductComponent, pathMatch: 'full' }
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
  declarations: [SingleProductComponent],
  providers: [UserProductsService, UserStoreAdminsService]
})
export class SingleProductModule { }
