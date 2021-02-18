import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss'],
})
export class PaginationBarComponent implements OnInit, OnDestroy {
  pages = [
    {
      pageNum: 1,
      active: true,
    },
    {
      pageNum: 2,
      active: false,
    },
    {
      pageNum: 3,
      active: false,
    },
    {
      pageNum: 4,
      active: false,
    },
    {
      pageNum: 5,
      active: false,
    },
    {
      pageNum: 6,
      active: false,
    },

    {
      pageNum: 7,
      active: false,
    },
    {
      pageNum: 8,
      active: false,
    },
    {
      pageNum: 9,
      active: false,
    },
    {
      pageNum: 10,
      active: false,
    },
  ];

  @Input() genre;
  @Output() moviesEmitter = new EventEmitter();
  subscriptions = new Subscription();
  genreFilter: any = {};

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handlePagination(page: any) {
    this.subscriptions.add(
      this.movieService.getByGenre(this.genre, page.pageNum).subscribe((resp: any) => {
        this.genreFilter.data = resp;
        this.genreFilter.activeGenre = this.genre;
        this.moviesEmitter.emit(this.genreFilter);
      })
    );

    this.pages.map((p) => (p.active = false));
    page.active = true;
  }
}
