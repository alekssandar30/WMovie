import { Component, Input, OnInit } from '@angular/core';
import { Movies, ResultsEntity } from '../../models/movies';

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
  };

  constructor() {}

  ngOnInit(): void {}
}
