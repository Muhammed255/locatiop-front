import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true               
};

import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';

import { TopInfoContentComponent } from './theme/components/top-info-content/top-info-content.component';
import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { FavoritesComponent } from './theme/components/favorites/favorites.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { AuthGuardLogin, AuthGuardMainAdmin, AuthGuardStoreAdmin, AuthGuardUser } from './services/auth/auth.guard';
import { MainAdminLayoutComponent } from './layouts/main-admin-layout/main-admin-layout.component';
import { MainAdminHeaderModule } from './main-admin-shared/main-admin-header/main-admin-header.module';
import { MainAdminFooterModule } from './main-admin-shared/main-admin-footer/main-admin-footer.module';
import { SideNavModule } from './main-admin-shared/side-nav/side-nav.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { MenuService } from './theme/components/menu/menu.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,     
    CalendarModule.forRoot(),
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBvP1Wi2PO9BoENcVOGN-t2WgLJm6Mv_yM",
      libraries: ["places"]
    }),
    PipesModule,
    routing,
    HttpClientModule,
    MainAdminHeaderModule,
    MainAdminFooterModule,
    SideNavModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    SearchComponent,
    NotFoundComponent,
    ErrorComponent,
    TopInfoContentComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FavoritesComponent,
    UserPagesComponent,
    MainAdminLayoutComponent,
  ],
  providers: [
    AppSettings,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardLogin,
    AuthGuardStoreAdmin,
    AuthGuardMainAdmin,
    AuthGuardUser,
    MenuService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
