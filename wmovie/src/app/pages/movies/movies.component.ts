import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/common.service';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  movies: Movies;
  moviesLoaded = false;
  currentGenre;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public common: CommonService
  ) {}

  ngOnInit(): void {
    // TODO: mozda i ovo promeniti da bude kao getByGenre...
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        const movieName = params.get('movieName');

        if (!movieName) {
          this.loadMovies();
        } else {
          // search
          this.getSearchedMovie(movieName);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadMovies() {
    this.subscriptions.add(
      this.movieService.getTrending().subscribe((data) => {
        this.movies = data;

        this.subscriptions.add(
          this.movieService.getTopRated().subscribe((resp) => {
            resp.results.forEach((movie) => {
              if (
                !(
                  this.movies.results.filter((x) => x.id === movie.id).length >
                  0
                )
              ) {
                this.movies.results.push(movie);
              }
            });
            this.common.showSpinner = false;
          })
        );
      })
    );
  }

  getSearchedMovie(movieName) {
    this.subscriptions.add(
      this.movieService.searchMovie(movieName).subscribe((data) => {
        this.movies = data;
        this.common.showSpinner = false;
      })
    );
  }

  getByGenre(event) {
    // refresh movies list
    this.movies.results = event.data;
    this.currentGenre = event.activeGenre;
    this.common.showSpinner = false;
  }

  handlePagination(event) {
    this.movies.results = event.data;
    this.currentGenre = event.activeGenre;
    // this.common.showSpinner = false;
  }

  trackByFn(item, index) {
    return item.id;
  }
}
