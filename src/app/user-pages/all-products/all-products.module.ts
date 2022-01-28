import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserProductsService } from 'src/app/services/user-products.service';
import { UserStoreAdminsService } from 'src/app/services/user-storeadmins.service';
import { UserCartService } from 'src/app/services/user-cart.service';
import { MenuService } from '../../theme/components/menu/menu.service';

export const routes = [
  { path: '', component: AllProductsComponent, pathMatch: 'full' }
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
  declarations: [AllProductsComponent],
  providers: [UserProductsService, UserStoreAdminsService, UserCartService, MenuService]
})
export class AllProductsModule { }
