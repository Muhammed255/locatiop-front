import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { SideNavModule } from '../main-admin-shared/side-nav/side-nav.module';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { GetLocationComponent } from './stores/get-location/get-location.component';
import { StoresComponent } from './stores/stores/stores.component';
import { CreateStoreComponent } from './stores/create-store/create-store.component';
import { CreateStoreAdminComponent } from './store-admin/create-store-admin/create-store-admin.component';
import { ListStoreAdminComponent } from './store-admin/list-store-admin/list-store-admin.component';
import { StoreAdminComponent } from './store-admin/store-admin/store-admin.component';
import { AuthGuard, AuthGuardMainAdmin } from '../services/auth/auth.guard';
import { StoresService } from '../services/stores.service';
import { CategoryService } from '../services/category.service';
import { AuthInterceptor } from '../services/auth/auth-interceptor';
import { RouterModule } from '@angular/router';
import { MainAdminComponentsRoutes } from './main-admin-pages.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainAdminComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    HighchartsChartModule,
    SideNavModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBvP1Wi2PO9BoENcVOGN-t2WgLJm6Mv_yM",
      libraries: ["places"]
    })
  ],
  declarations: [
    CategoryListComponent,
    CreateCategoryComponent,
    GetLocationComponent,
    StoresComponent,
    CreateStoreComponent,
    CreateStoreAdminComponent,
    ListStoreAdminComponent,
    StoreAdminComponent
  ],
  entryComponents: [CreateStoreAdminComponent, StoreAdminComponent, GetLocationComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    AuthGuardMainAdmin,
    CategoryService,
    StoresService
  ],
})
export class MainAdminPagesModule { }
