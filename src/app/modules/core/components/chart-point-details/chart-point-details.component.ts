import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { ChartObject } from '../../../shared/models/chartObject';

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

  constructor(private chartDataService: ChartDataService,   private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route?.snapshot?.paramMap?.get('id') ?? '';
    this.getPointDetails(id);
  }

  getPointDetails(id:string) {
      let chartList: ChartObject[] = this.chartDataService.getChartListFromLocalStorage();
      let chartPoint = chartList.find(d => d.id == id);
      if (chartPoint)
        this.chartPointDetails = chartPoint;
  }
}
