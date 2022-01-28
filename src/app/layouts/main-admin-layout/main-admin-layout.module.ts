import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainAdminLayoutRoutes } from './main-admin-layout.routing';
import { MainAdminDashboardComponent } from 'src/app/main-admin-pages/main-admin-dashboard/main-admin-dashboard.component';
import { AreaComponent } from './../../widgets/area/area.component';
import { PieComponent } from './../../widgets/pie/pie.component';
import { CardComponent } from './../../widgets/card/card.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MainAdminHeaderModule } from 'src/app/main-admin-shared/main-admin-header/main-admin-header.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        MainAdminDashboardComponent,
        AreaComponent,
        PieComponent,
        CardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(MainAdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HighchartsChartModule,
        MainAdminHeaderModule,
        SharedModule
    ]
})
export class MainAdminLayoutModule {}
