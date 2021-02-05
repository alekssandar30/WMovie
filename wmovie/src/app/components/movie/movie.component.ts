import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie;
  hostLink = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  playMovie(movieId) {
    this.movieService.playMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
