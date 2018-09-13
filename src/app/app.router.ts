import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard, SignUpGuard, PendingGuard } from '../common';
import { NotFoundScreenComponent } from '../screens/not-found/not-found.component';
import { PendingScreenComponent } from '../screens/pending/pending.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: '../screens/home/home.module#HomeScreenModule',
    canActivate: [AuthenticationGuard],
    canLoad: [AuthenticationGuard]
  }, 
  {
    path: 'signup',
    loadChildren: '../screens/signup/signup.module#SignUpScreenModule',
    canActivate: [SignUpGuard],
    canLoad: [SignUpGuard]
  },   
  {
    path: 'pending',
    component: PendingScreenComponent,
    canActivate: [PendingGuard],
  }, 
  {
    path: '**',
    component: NotFoundScreenComponent
  }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });