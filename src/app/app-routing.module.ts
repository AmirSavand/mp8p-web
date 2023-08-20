import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRouter } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'match',
    loadChildren: () => import('./match/match.module').then(m => m.MatchModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
