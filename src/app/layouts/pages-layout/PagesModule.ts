import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './pages.routes';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TagInputModule } from 'ngx-chips';
import { NgxPaginationModule } from 'ngx-pagination';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { OffersListComponent } from 'src/app/pages/admin-offers/offers-list/offers-list.component';
import { ProductsListComponent } from 'src/app/pages/admin-products/products-list/products-list.component';
import { AddOfferComponent } from 'src/app/pages/admin-offers/add-offer/add-offer.component';
import { EmailVerificationComponent } from 'src/app/pages/email-verification/email-verification.component';
import { CreateEditJobComponent } from 'src/app/pages/jobs/create-edit-job/create-edit-job.component';
import { MyJobsComponent } from 'src/app/pages/jobs/my-jobs/my-jobs.component';
import { SingleJobComponent } from 'src/app/pages/jobs/single-job/single-job.component';
import { MyStoreComponent } from 'src/app/pages/my-store/my-store.component';
import { ResendConfirmationComponent } from 'src/app/pages/resend-confirmation/resend-confirmation.component';
import { AuthInterceptor } from 'src/app/services/auth/auth-interceptor';
import { CreateProductComponent } from 'src/app/pages/admin-products/create-product/create-product.component';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(adminRoutes),
        CKEditorModule,
        TagInputModule,
        PipesModule,
        NgxPaginationModule,
        CountdownTimerModule
    ],
    declarations: [
        AddOfferComponent,
        OffersListComponent,
        CreateProductComponent,
        ProductsListComponent,
        CreateEditJobComponent,
        MyJobsComponent,
        SingleJobComponent,
        MyStoreComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
} )
export class PagesModule {
}
