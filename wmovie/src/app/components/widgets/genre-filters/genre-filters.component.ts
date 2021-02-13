import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-genre-filters',
  templateUrl: './genre-filters.component.html',
  styleUrls: ['./genre-filters.component.scss'],
})
export class GenreFiltersComponent implements OnInit {
  private subscriptions = new Subscription();

  public genres = [
    {
      id: 28,
      name: 'Action',
      active: false,
    },
    {
      id: 12,
      name: 'Adventure',
      active: false,
    },
    {
      id: 35,
      name: 'Comedy',
      active: false,
    },
    {
      id: 80,
      name: 'Crime',
      active: false,
    },
    {
      id: 18,
      name: 'Drama',
      active: false,
    },
    {
      id: 10751,
      name: 'Family',
      active: false,
    },
    {
      id: 14,
      name: 'Fantasy',
      active: false,
    },
    {
      id: 36,
      name: 'History',
      active: false,
    },
    {
      id: 27,
      name: 'Horror',
      active: false,
    },
    {
      id: 9648,
      name: 'Mystery',
      active: false,
    },
    {
      id: 10749,
      name: 'Romance',
      active: false,
    },
    {
      id: 878,
      name: 'Science Fiction',
      active: false,
    },
    {
      id: 53,
      name: 'Thriller',
      active: false,
    },
  ];

  @Output()
  moviesEmitter = new EventEmitter();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  onGetGenre(genre) {
    // call getGenre
    this.subscriptions.add(
      this.movieService.getByGenre(genre, 1).subscribe((resp: any) => {
        this.moviesEmitter.emit(resp);
      })
    );

    // set all genre.active to false
    this.genres.map((g) => (g.active = false));
    genre.active = true;
  }
}
