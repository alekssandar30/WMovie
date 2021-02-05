import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  popular: Movies;
  popularLoaded = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.popular = data;
      this.popularLoaded = true;
    });
  }

}
