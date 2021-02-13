import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TODO: mozda i ovo promeniti da bude kao getByGenre...
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        const movieName = params.get('movieName');

        if (!movieName) {
          this.subscriptions.add(
            this.movieService.getTrending().subscribe((data) => {
              this.movies = data;
              // this.movies.results = this.movies.results.filter(
              //   (x) => x.media_type === 'movie'
              // );

              this.subscriptions.add(
                this.movieService.getTopRated().subscribe((resp) => {
                  resp.results.forEach((movie) => {
                    if (
                      !(
                        this.movies.results.filter((x) => x.id === movie.id)
                          .length > 0
                      )
                    ) {
                      this.movies.results.push(movie);
                    }
                  });
                })
              );
            })
          );
        } else {
          // search
          this.subscriptions.add(
            this.movieService.searchMovie(movieName).subscribe((data) => {
              this.movies = data;
            })
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getByGenre(event) {
    // refresh movies list
    this.movies.results = event;
  }
}
