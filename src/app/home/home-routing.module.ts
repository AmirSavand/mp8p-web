import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
      },
      {
        path: 'multiplayer',
        loadChildren: () => import('./multiplayer/multiplayer.module').then(m => m.MultiplayerModule),
      },
      {
        path: 'readme',
        loadChildren: () => import('./readme/readme.module').then(m => m.ReadmeModule),
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'main',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
