import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        component: MoviesComponent,
      },
      {
        path: 'search/:movieName',
        component: MoviesComponent,
      },
      {
        path: ':genre/:pageNum',
        component: MoviesComponent,
      },
    ],
  },

  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
