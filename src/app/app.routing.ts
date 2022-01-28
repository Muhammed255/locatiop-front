import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import {
    AuthGuardStoreAdmin,
    AuthGuardLogin,
    AuthGuardMainAdmin,
    AuthGuardUser,
} from './services/auth/auth.guard';
import { MainAdminLayoutComponent } from './layouts/main-admin-layout/main-admin-layout.component';
import { CreateProductComponent } from './pages/admin-products/create-product/create-product.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'main-admin',
        component: MainAdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren:
                    './layouts/main-admin-layout/main-admin-layout.module#MainAdminLayoutModule',
            },
        ],
        canActivate: [AuthGuardMainAdmin],
    },
    {
        path: 'main-admin',
        component: MainAdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren:
                    './main-admin-pages/main-admin-pages.module#MainAdminPagesModule',
            },
        ],
        canActivate: [AuthGuardMainAdmin],
    },
    {
        path: 'home',
        component: PagesComponent,
        children: [
            {
                path: '',
                loadChildren: './layouts/pages-layout/PagesModule#PagesModule',
            },
            {
                path: 'chat',
                loadChildren: './pages/chat/chat.module#ChatModule',
                data: { breadcrumb: 'Chat' }
            },
        ],
        canActivate: [AuthGuardStoreAdmin]
        /* 
      
        {
                path: 'users',
                loadChildren: './pages/users/users.module#UsersModule',
                data: { breadcrumb: 'Users' }
            },
            {
                path: 'mailbox',
                loadChildren: './pages/mailbox/mailbox.module#MailboxModule',
                data: { breadcrumb: 'Mailbox' }
            },
            {
                path: 'chat',
                loadChildren: './pages/chat/chat.module#ChatModule',
                data: { breadcrumb: 'Chat' }
            },
            {
                path: 'search',
                component: SearchComponent,
                data: { breadcrumb: 'Search' }
            },
            {
                path: 'search/:name',
                component: SearchComponent,
                data: { breadcrumb: 'Search' }
            },
        
        */
    },
    {
        path: 'account',
        component: UserPagesComponent,
        children: [
            {
                path: 'products',
                loadChildren: './user-pages/all-products/all-products.module#AllProductsModule',
                data: { breadcrumb: 'Products' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'offers',
                loadChildren: './user-pages/all-offers/all-offers.module#AllOffersModule',
                data: { breadcrumb: 'Offers' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'jobs',
                loadChildren: './user-pages/all-jobs/all-jobs.module#AllJobsModule',
                data: { breadcrumb: 'Jobs' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'admins',
                loadChildren: './user-pages/all-stores-admins/all-stores-admins.module#AllStoresAdminsModule',
                data: { breadcrumb: 'Stores Admins' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'product/:prodId',
                loadChildren: './user-pages/single-product/single-product.module#SingleProductModule',
                data: { breadcrumb: 'Product' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'offer/offerId',
                loadChildren: './user-pages/single-offer/single-offer.module#SingleOfferModule',
                data: { breadcrumb: 'Offer' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'store/:storeId',
                loadChildren: './user-pages/single-store/single-store.module#SingleStoreModule',
                data: { breadcrumb: 'Store' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'store-admin/:adminId',
                loadChildren: './user-pages/single-store-admin/single-store-admin.module#SingleStoreAdminModule',
                data: { breadcrumb: 'Store Admin' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'job/:jobId',
                loadChildren: './user-pages/single-job/single-job.module#SingleJobModule',
                data: { breadcrumb: 'Job' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'my-cart',
                loadChildren: './user-pages/cart/cart.module#CartModule',
                data: { breadcrumb: 'My Cart' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'profile/:authId',
                loadChildren: './user-pages/auth-profile/auth-profile.module#AuthProfileModule',
                data: { breadcrumb: 'My Profile' },
                canActivate: [AuthGuardUser]
            },
            {
                path: 'homepage',
                loadChildren: './user-pages/user-home/user-home.module#UserHomeModule',
                data: { breadcrumb: 'Home' },
                canActivate: [AuthGuardUser]
            }
        ],
    },
    {
        path: 'user/landing',
        loadChildren: './pages/landing/landing.module#LandingModule',
    },
    {
        path: 'user/login',
        loadChildren: './pages/login/login.module#LoginModule',
        canActivate: [AuthGuardLogin],
    },
    {
        path: 'user/register',
        loadChildren: './pages/register/register.module#RegisterModule',
        canActivate: [AuthGuardLogin],
    },
    {
        path: 'user/email/confirmation',
        loadChildren: './pages/email-verification/email-verification.module#EmailVerificationModule',
        canActivate: [AuthGuardLogin]
    },
    {
        path: 'user/resend/confirmation',
        loadChildren: './pages/resend-confirmation/resend-confirmation.module#ResendConfirmationModule',
        canActivate: [AuthGuardLogin]
    },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
