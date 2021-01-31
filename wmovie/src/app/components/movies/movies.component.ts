import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movies[]

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getFeaturedMovies().subscribe((resp: any) => {
      this.movies = resp.results;
      console.log(resp);
    })
  }

}
