import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss'],
})
export class PaginationBarComponent implements OnInit {
  pages = [
    {
      pageNum: 1,
      active: true,
    },
    {
      pageNum: 2,
      active: false,
    },
    {
      pageNum: 3,
      active: false,
    },
    {
      pageNum: 4,
      active: false,
    },
    {
      pageNum: 5,
      active: false,
    },
    {
      pageNum: 6,
      active: false,
    },

    {
      pageNum: 7,
      active: false,
    },
    {
      pageNum: 8,
      active: false,
    },
    {
      pageNum: 9,
      active: false,
    },
    {
      pageNum: 10,
      active: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
