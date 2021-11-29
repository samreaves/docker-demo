import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoUserGuard, UserExistsGuard } from './guards';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    canActivateChild: [UserExistsGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'signin',
    canActivateChild: [NoUserGuard],
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [
    UserExistsGuard,
    NoUserGuard,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
