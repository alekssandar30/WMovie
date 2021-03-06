import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchInput = '';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {}

  Search(): any {
    if (this.searchInput === '') {
      this.router.navigate(['/movies']);
      return;
    }

    this.router.navigate(['/movies/search/' + this.searchInput]);
  }
}
