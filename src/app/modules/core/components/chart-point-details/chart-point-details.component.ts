import { Component, OnInit } from '@angular/core';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { ChartObject } from '../../models/chartObject';

@Component({
  selector: 'app-chart-point-details',
  templateUrl: './chart-point-details.component.html',
  styleUrls: ['./chart-point-details.component.css']
})
export class ChartPointDetailsComponent implements OnInit {
  chartPointDetails: ChartObject = {
    id: '',
    country: '',
    camp: '',
    school: '',
    lessons: 0,
    month: ''
  };

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.getPointDetails();
  }

  getPointDetails() {
    this.chartDataService.pointInLineClickedInChart.subscribe((res: any) => {
      let chartList: ChartObject[] = this.chartDataService.getChartListFromLocalStorage();
      let chartPoint = chartList.find(d => d.school == res.label && d.month == res.x && d.lessons == res.y);
      if (chartPoint)
        this.chartPointDetails = chartPoint;
    });
  }
}
