import { Routes } from '@angular/router';
import { MainAdminDashboardComponent } from 'src/app/main-admin-pages/main-admin-dashboard/main-admin-dashboard.component';


export const MainAdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        data: { title: 'FP4U 🧐 | Dashboard' },
        component: MainAdminDashboardComponent
    }
];
