import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { VideoModalComponent } from '../video-modal/video-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie;
  hostLink = '';

  constructor(private movieService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  playMovie(movie) {
    console.log(movie.id);
    const formatedReq = `${movie.original_title.replaceAll(' ', '+')}+(${
      movie.release_date.split('-')[0]
    })`;

    this.movieService
      .playMovie(formatedReq, movie.id)
      .subscribe((resp: any) => {
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
}
