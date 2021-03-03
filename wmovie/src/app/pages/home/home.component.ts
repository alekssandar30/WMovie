import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { forkJoin, Subscription } from 'rxjs';
import { VideoModalComponent } from 'src/app/components/video-modal/video-modal.component';
import { CommonService } from 'src/app/core/common.service';
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

  activeMovie;
  hostLink = '';
  innerWidth;
  counter = 0;

  constructor(private movieService: MovieService, public dialog: MatDialog, public common: CommonService) {}

  ngOnInit(): any {
    this.innerWidth = window.innerWidth;
    this.loadMovies();

    setInterval(() => {
      if (this.counter === 34) { // magic number -> end of the trending array
        this.counter = 0;
      }
      this.activeMovie = this.trending.results[this.counter++];
    }, 4000);
  }

  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }

  playBanerMovie() {
    const formatedReq = `${this.activeMovie.title.replace(/\//g, '+')}+(${
      this.activeMovie.releaseDate.split('-')[0]
    })`;
    this.subs.push(
      this.movieService
        .playMovie(formatedReq, this.activeMovie.id)
        .subscribe((resp) => {
          if (resp !== 'Movie not found.') {
            this.hostLink = resp;
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;

            let relativeWidth = (this.innerWidth * 80) / 100; // take up to 80% of the screen size
            if (this.innerWidth > 1500) {
              relativeWidth = (1500 * 80) / 100;
            } else {
              relativeWidth = (this.innerWidth * 80) / 100;
            }

            const relativeHeight = (relativeWidth * 9) / 16; // 16:9 to which we add 120 px for the dialog action buttons ("close")
            dialogConfig.width = relativeWidth + 'px';
            dialogConfig.height = relativeHeight + 'px';
            dialogConfig.data = {
              movie: this.activeMovie,
              hostLink: this.hostLink,
            };

            const dialogRef = this.dialog.open(
              VideoModalComponent,
              dialogConfig
            );
            // dialogRef.componentInstance.hostLink = this.hostLink;

            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
          }
        })
    );
  }

  showBannerMovieInfo(): any {
    // alert(this.trending.results[0].overview);

    // const dialogConfig = new MatDialogConfig();

    // this.setDialogConfig(dialogConfig);

    // const dialogRef = this.dialog.open(VideoModalComponent, dialogConfig);

    // dialogRef.componentInstance.hostLink = this.hostLink;

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  setDialogConfig(dialogConfig: MatDialogConfig): void {
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    let relativeWidth = (this.innerWidth * 80) / 100; // take up to 80% of the screen size
    if (this.innerWidth > 1500) {
      relativeWidth = (1500 * 80) / 100;
    } else {
      relativeWidth = (this.innerWidth * 80) / 100;
    }

    const relativeHeight = (relativeWidth * 9) / 16; // 16:9 to which we add 120 px for the dialog action buttons ("close")
    dialogConfig.width = relativeWidth + 'px';
    dialogConfig.height = relativeHeight + 'px';
  }

  loadMovies() {
    this.subs.push(
      this.movieService.getTrending().subscribe((data) => {
        data.results.forEach((movie) => {
          movie.backdropPath =
            'https://image.tmdb.org/t/p/original' + movie.backdropPath;
        });
        this.trending = data;

        this.activeMovie = this.trending.results[0];
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
  }
}
