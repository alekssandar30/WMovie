import { Component, Input, OnInit } from '@angular/core';
import { ResultsEntity } from '../../models/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() movies: ResultsEntity[];
  @Input() title: string;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 3,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 424,
        'settings': {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        'settings': {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1023,
        'settings': {
          slidesToShow: 5,
        }
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
