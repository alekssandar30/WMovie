import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { VideoModalComponent } from '../video-modal/video-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  @Input() movie;
  hostLink = '';
  innerWidth;

  constructor(private movieService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  playMovie(movie): any {
    console.log(movie.id);
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
            dialogConfig.maxHeight = relativeHeight + 'px';

            const dialogRef = this.dialog.open(
              VideoModalComponent,
              dialogConfig
            );

            dialogRef.componentInstance.hostLink = this.hostLink;

            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
          }
        })
    );
  }
}
