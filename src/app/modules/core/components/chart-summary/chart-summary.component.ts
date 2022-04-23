import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-summary',
  templateUrl: './chart-summary.component.html',
  styleUrls: ['./chart-summary.component.css']
})
export class ChartSummaryComponent implements OnInit {
  totalNumberOfLessons = 50;
  selectedCamp = 'neven';
  campWithLessons = [{ lessons: 10, school: 'test' }];

  constructor() { }

  ngOnInit(): void {
  }

}
