import { Routes } from "@angular/router";
import { ProductsListComponent } from "src/app/pages/admin-products/products-list/products-list.component";
import { AddOfferComponent } from "src/app/pages/admin-offers/add-offer/add-offer.component";
import { OffersListComponent } from "src/app/pages/admin-offers/offers-list/offers-list.component";
import { MyJobsComponent } from "src/app/pages/jobs/my-jobs/my-jobs.component";
import { MyStoreComponent } from "src/app/pages/my-store/my-store.component";
import { CreateProductComponent } from "src/app/pages/admin-products/create-product/create-product.component";

export const adminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren:
                '../../pages/dashboard/dashboard.module#DashboardModule',
                data: { breadcrumb: 'Dashboard' }
            },
            {
                path: 'product/create',
                component: CreateProductComponent,
                data: { breadcrumb: 'Create Product' }
            },
            {
                path: 'product/all',
                component: ProductsListComponent,
                data: { breadcrumb: 'My Products' }
            },
            {
                path: 'offer/add',
                component: AddOfferComponent,
                data: { breadcrumb: 'Create Offer' }
            },
            {
                path: 'offer/edit/:offerId',
                component: AddOfferComponent,
                data: { breadcrumb: 'Edit Offer' }
            },
            {
                path: 'offer/list',
                component: OffersListComponent,
                data: { breadcrumb: 'My Offers' }
            },
            {
                path: 'jobs',
                component: MyJobsComponent,
                data: { breadcrumb: 'My Jobs' }
            },
            // { path: 'jobs/new', loadChildren: './pages/jobs/create-edit-job/create-edit-job.module#CreateEditJobModule', data: { breadcrumb: 'Create | Edit Job' }, canActivate: [AuthGuardStoreAdmin] },
            {
                path: 'store/:storeId',
                component: MyStoreComponent,
                data: { breadcrumb: 'My Store' }
            },
        ]
    }
]