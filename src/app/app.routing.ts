import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInService } from './services/logged-in.service';

import { HomepageComponent } from './components/homepage/homepage.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CreatePhongtroComponent } from './components/create-phongtro/create-phongtro.component';
import { Error404Component } from './components/404/404.component';
import { LoginComponent } from './components/login/login.component';
import { PhongtroDetailComponent } from './components/phongtro-detail/phongtro-detail.component';
import { TransferMoneyComponent } from './components/transfer-money/transfer-money.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { PhongtroUserComponent } from './components/phongtro-user/phongtro-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListDatcocComponent } from './components/list-datcoc/list-datcoc.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: 'search/result',
    component: SearchResultComponent
  },
  {
    path: 'phongtro',
    children: [
      {
        path: 'create',
        component: CreatePhongtroComponent,
        canActivate: [LoggedInService]
      },
      {
        path: 'detail/:id',
        component: PhongtroDetailComponent
      },
      {
        path: 'user',
        component: PhongtroUserComponent,
        canActivate: [LoggedInService]
      },
      {
        path: 'datcoc/:id',
        component: ListDatcocComponent,
        canActivate: [LoggedInService]
      }
    ]
  },
  {
    path: 'transfer',
    component: TransferMoneyComponent
  },
  {
    path: 'user/info',
    component: UserInfoComponent,
    canActivate: [LoggedInService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
