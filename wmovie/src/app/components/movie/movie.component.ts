import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { VideoModalComponent } from '../video-modal/video-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy, OnChanges {
  subscriptions: Subscription = new Subscription();

  @Input() movie;
  @Input() showOverview;
  hostLink = '';
  innerWidth;
  defaultImg = '../../../assets/lazy-load-default.svg';
  image;
  imgPrefix = 'https://image.tmdb.org/t/p/w200';
  imageOffset = 100; // in pixels

  constructor(private movieService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.image = this.imgPrefix + this.movie.posterPath;
    this.innerWidth = window.innerWidth;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.movie = changes.movie.currentValue;
    this.image = this.imgPrefix + this.movie.posterPath;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  playMovie(movie): any {
    const formatedReq = `${movie.title.replaceAll(' ', '+')}+(${
      movie.releaseDate.split('-')[0]
    })`;

    this.subscriptions.add(
      this.movieService
        .playMovie(formatedReq, movie.id)
        .subscribe((resp: any) => {
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
              movie: movie,
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
}
