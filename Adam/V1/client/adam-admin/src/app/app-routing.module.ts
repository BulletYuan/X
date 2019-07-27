import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterGuardService } from './service/routerGuard.service';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [RouterGuardService],
    data: {
      title: '比赛配置',
    },
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [RouterGuardService],
      }, {
        path: 'login',
        component: LoginComponent,
        canActivate: [RouterGuardService],
        data: {
          title: '登录',
          customLayout: true
        }
      }, {
        path: '**',
        component: HomeComponent,
        canActivate: [RouterGuardService],
        data: {
          title: '比赛配置',
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
