import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CreatePhongtroComponent } from './create-phongtro/create-phongtro.component';
import { Error404Component } from './404/404.component';

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
    path: 'search/result',
    component: SearchResultComponent
  },
  {
    path: 'phongtro',
    children: [
      {
        path: 'create',
        component: CreatePhongtroComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
