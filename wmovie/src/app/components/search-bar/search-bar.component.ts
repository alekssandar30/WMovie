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

  Search() {
    console.log(this.searchInput);
    this.router.navigate(['/movies/search/' + this.searchInput]);
    // this.movieService.searchMovie(this.searchInput).subscribe((resp: any) => {
    //   console.log(resp);
    //   // redirectuj se na movies komponentu i prosledi kroz router ovaj resp

    // });
  }
}
