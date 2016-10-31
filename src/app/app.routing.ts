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

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: 'login',
    component: LoginComponent
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
        component: CreatePhongtroComponent
        // canActivate: [LoggedInService]
      },
      {
        path: 'detail/:id',
        component: PhongtroDetailComponent
      },
      {
        path: 'user',
        component: PhongtroUserComponent
      }
    ]
  },
  {
    path: 'transfer',
    component: TransferMoneyComponent
  },
  {
    path: 'user/info',
    component: UserInfoComponent
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
