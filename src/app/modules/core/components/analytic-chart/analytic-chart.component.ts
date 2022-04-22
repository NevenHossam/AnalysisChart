
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import 'chart.js';
import { ChartObject } from '../../models/chartObject';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
@Component({
  selector: 'app-analytic-chart',
  templateUrl: './analytic-chart.component.html',
  styleUrls: ['./analytic-chart.component.css']
})
export class AnalyticChartComponent implements OnInit {
  dataFilteredByDropDownLists: ChartObject[] = [];

  //Labels shown on the x-axis
  lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lineChartData: ChartDataSets[] = [];

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.listenToFilteredDataListForChart();
  }

  listenToFilteredDataListForChart() {
    this.chartDataService.chartList.subscribe((res: ChartObject[]) => {
      if (res != undefined) {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        res.sort(function (a, b) {
          return months.indexOf(a.month) - months.indexOf(b.month);
        });
        this.dataFilteredByDropDownLists = res;
      }
      else {
        this.dataFilteredByDropDownLists = [];
      }

      this.mapListIntoChartDataSets();
    });
  }

  mapListIntoChartDataSets() {
    let chartMappedList = [];

    if (this.dataFilteredByDropDownLists.length > 0) {
      let list = this.dataFilteredByDropDownLists.map(obj => {
        return ({ data: obj.lessons, label: obj.school, month: obj.month });
      });

      chartMappedList.push({ data: [list[0].data], label: list[0].label });
      for (let i = 1; i < list.length; i++) {
        let index = chartMappedList.findIndex(l => l?.label == list[i].label);
        if (index >= 0 && index != undefined) {
          chartMappedList[index]?.data.push(list[i].data);
        }
        else
          chartMappedList.push({ data: [list[i].data], label: list[i].label });
      }
      this.lineChartData = chartMappedList;
    }
    else this.lineChartData = [];
  }

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType: ChartType = 'line';

  lineChartPlugins = [];



  // events
  onChartClick = ($event: any) => {
    window.console.log('onChartClick', $event);
  };

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}