import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Movies } from './models/movies';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  sticky = false;
  subs: Subscription[] = [];

  trending: Movies;
  popular: Movies;
  topRated: Movies;
  originals: Movies;
  nowPlaying: Movies;

  trendingLoaded = false;
  popularLoaded = false;
  topRatedLoaded = false;
  originalsLoaded = false;
  nowPlayingLoaded = false;

  @ViewChild('stickHeader') header: ElementRef;
  headerBGUrl: string;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }


  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(): any {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  // TODO: fix this
  changeBackgroundImg() {
    setInterval(() => {
      this.trending.results.forEach((item) => {
        this.headerBGUrl =
          'https://image.tmdb.org/t/p/original' + item.backdrop_path;
      });
    }, 5000);
  }

  loadMovies(): any {
    this.subs.push(
      this.movieService.getTrending().subscribe((data) => {
        this.trending = data;
        this.headerBGUrl =
          'https://image.tmdb.org/t/p/original' +
          this.trending.results[1].backdrop_path;
        this.trendingLoaded = true;
      })
    );
    this.subs.push(
      this.movieService.getPopularMovies().subscribe((data) => {
        this.popular = data;
        this.popularLoaded = true;
      })
    );
    this.subs.push(
      this.movieService.getTopRated().subscribe((data) => {
        this.topRated = data;
        this.topRatedLoaded = true;
      })
    );
    this.subs.push(
      this.movieService.getOriginals().subscribe((data) => {
        this.originals = data;
        this.originalsLoaded = true;
      })
    );
    this.subs.push(
      this.movieService.getNowPlaying().subscribe((data) => {
        this.nowPlaying = data;
        this.nowPlayingLoaded = true;
      })
    );
  }
}
