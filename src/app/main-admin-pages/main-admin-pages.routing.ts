import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { AuthGuardMainAdmin } from '../services/auth/auth.guard';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { StoresComponent } from './stores/stores/stores.component';
import { CreateStoreComponent } from './stores/create-store/create-store.component';
import { ListStoreAdminComponent } from './store-admin/list-store-admin/list-store-admin.component';

export const MainAdminComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'categories',
				component: CategoryListComponent,
				data: {
					title: 'Categories'
				}
			},
			{
				path: 'categories/edit/:catId',
				component: CreateCategoryComponent,
				data: {
					title: 'Categories'
				}
			},
			{
				path: 'categories/create',
				component: CreateCategoryComponent,
				data: {
					title: 'Add Category'
				}
			},
			{
				path: 'stores/list',
				component: StoresComponent,
				data: {
					title: 'Stores'
				}
			},
			{
				path: 'stores/create',
				component: CreateStoreComponent,
				data: {
					title: 'Add Store'
				}
			},
			{
				path: 'storeAdmin/list',
				component: ListStoreAdminComponent,
				data: {
					title: 'Store Admins'
				}
			}
		]
	}
];