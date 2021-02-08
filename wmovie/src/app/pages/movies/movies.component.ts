import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movies;
  moviesLoaded = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieName = params.get('movieName');
      console.log(params);

      if (!movieName) {
        this.movieService.getTrending().subscribe((data) => {
          this.movies = data;
          // this.movies.results = this.movies.results.filter(
          //   (x) => x.media_type === 'movie'
          // );

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
          });
        });
      } else {
        // search
        this.movieService.searchMovie(movieName).subscribe((data) => {
          this.movies = data;
        });
      }
    });
  }
}
