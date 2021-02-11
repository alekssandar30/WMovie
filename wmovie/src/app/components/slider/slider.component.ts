import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { ResultsEntity } from '../../models/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  subscriptions: Subscription = new Subscription();

  @Input() movies: ResultsEntity[];
  @Input() title: string;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 3,
    arrows: true,
    autoplay: false,
  };

  constructor(private movieService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {}
}
