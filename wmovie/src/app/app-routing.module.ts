import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
