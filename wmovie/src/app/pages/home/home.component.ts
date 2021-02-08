import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { VideoModalComponent } from 'src/app/components/video-modal/video-modal.component';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  trending: Movies;
  popular: Movies;
  topRated: Movies;
  // originals: Movies;
  // nowPlaying: Movies;

  trendingLoaded = false;
  popularLoaded = false;
  topRatedLoaded = false;
  // originalsLoaded = false;
  // nowPlayingLoaded = false;

  headerBGUrl: string;
  hostLink = '';

  constructor(private movieService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }

  playBanerMovie() {
    const formatedReq = `${this.trending.results[0].title.replace(
      /\//g,
      '+'
    )}+(${this.trending.results[0].releaseDate.split('-')[0]})`;
    this.movieService
      .playMovie(formatedReq, this.trending.results[0].id)
      .subscribe((resp) => {
        if (resp !== 'Movie not found.') {
          this.hostLink = resp;
          const dialogRef = this.dialog.open(VideoModalComponent, {
            width: '50%',
            height: '50%',
          });

          dialogRef.componentInstance.hostLink = this.hostLink;

          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
        }
      });
  }

  // TODO: fix this
  // changeBackgroundImg() {
  //   setInterval(() => {
  //     this.trending.results.forEach((item) => {
  //       this.headerBGUrl =
  //         'https://image.tmdb.org/t/p/original' + item.backdropPath;
  //     });
  //   }, 5000);
  // }

  loadMovies(): any {
    this.subs.push(
      this.movieService.getTrending().subscribe((data) => {
        this.trending = data;
        this.headerBGUrl =
          'https://image.tmdb.org/t/p/original' +
          this.trending.results[0].backdropPath;
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
    // this.subs.push(
    //   this.movieService.getOriginals().subscribe((data) => {
    //     this.originals = data;
    //     this.originalsLoaded = true;
    //   })
    // );
    // this.subs.push(
    //   this.movieService.getNowPlaying().subscribe((data) => {
    //     this.nowPlaying = data;
    //     this.nowPlayingLoaded = true;
    //   })
    // );
  }
}
