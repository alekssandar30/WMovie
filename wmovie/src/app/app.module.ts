import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { SliderComponent } from './components/slider/slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MovieComponent } from './components/movie/movie.component';
import { FormsModule } from '@angular/forms';
import { MoviesComponent } from './pages/movies/movies.component';
import { HomeComponent } from './pages/home/home.component';
import { TvSeriesComponent } from './pages/tv-series/tv-series.component';
import { HeaderComponent } from './components/header/header.component';
import { VideoModalComponent } from './components/video-modal/video-modal.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import { GenreFiltersComponent } from './components/widgets/genre-filters/genre-filters.component';
import { PaginationBarComponent } from './components/widgets/pagination-bar/pagination-bar.component';
import { LoadingSpinnerComponent } from './components/widgets/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    SearchBarComponent,
    MovieComponent,
    MoviesComponent,
    HomeComponent,
    TvSeriesComponent,
    HeaderComponent,
    VideoModalComponent,
    FooterComponent,
    GenreFiltersComponent,
    PaginationBarComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
