import { Routes } from '@angular/router';
import { ErrorComponent, HomeComponent, LayoutComponent, NotFoundComponent } from '@lib';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent },
      { path: 'error', component: ErrorComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
