import { Component, OnInit } from '@angular/core';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { ChartSummary } from '../../models/chartSummary';

@Component({
  selector: 'app-chart-summary',
  templateUrl: './chart-summary.component.html',
  styleUrls: ['./chart-summary.component.css']
})
export class ChartSummaryComponent implements OnInit {
  summaryChart!: ChartSummary;

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.listenToChangedChartSummary();
  }

  listenToChangedChartSummary() {
    this.chartDataService.chartSummary.subscribe((res: ChartSummary) => {
      if (res != undefined) {
        this.summaryChart = res;
      }
      else {
        this.summaryChart = { schoolWithLesson: [], selectedCamp: '', totalNumberOfLessons: 0 }
      }
    });
  }
}
