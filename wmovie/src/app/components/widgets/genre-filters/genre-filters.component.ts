import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-genre-filters',
  templateUrl: './genre-filters.component.html',
  styleUrls: ['./genre-filters.component.scss'],
})
export class GenreFiltersComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public genres = [
    {
      id: 28,
      name: 'Akcija',
      active: false,
    },
    {
      id: 12,
      name: 'Avantura',
      active: false,
    },
    {
      id: 35,
      name: 'Komedija',
      active: false,
    },
    {
      id: 80,
      name: 'Krimi',
      active: false,
    },
    {
      id: 18,
      name: 'Drama',
      active: false,
    },
    {
      id: 10751,
      name: 'Porodicni',
      active: false,
    },
    {
      id: 14,
      name: 'Fantazija',
      active: false,
    },
    {
      id: 36,
      name: 'Istorijski',
      active: false,
    },
    {
      id: 27,
      name: 'Horor',
      active: false,
    },
    {
      id: 9648,
      name: 'Misterije',
      active: false,
    },
    {
      id: 10749,
      name: 'Romanticni',
      active: false,
    },
    {
      id: 878,
      name: 'Naucna fantastika',
      active: false,
    },
    {
      id: 53,
      name: 'Trileri',
      active: false,
    },
  ];

  @Output()
  moviesEmitter = new EventEmitter();

  genreFilter: any = {};

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onGetGenre(genre) {
    // call getGenre
    this.subscriptions.add(
      this.movieService.getByGenre(genre, 1).subscribe((resp: any) => {
        this.genreFilter.data = resp;
        this.genreFilter.activeGenre = genre;
        this.moviesEmitter.emit(this.genreFilter);
      })
    );

    // set all genre.active to false
    this.genres.map((g) => (g.active = false));
    genre.active = true;
  }

  trackByFn(index, item) {
    return item.name;
  }
}
