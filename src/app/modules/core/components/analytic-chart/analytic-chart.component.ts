
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Chart, { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import 'chart.js';
import { ChartObject } from '../../models/chartObject';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { chart } from 'highcharts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-analytic-chart',
  templateUrl: './analytic-chart.component.html',
  styleUrls: ['./analytic-chart.component.css']
})
export class AnalyticChartComponent implements OnInit {
  dataFilteredByDropDownLists: ChartObject[] = [];
  selectedCountryName: string = '';
  //Labels shown on the x-axis
  lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lineChartData: ChartDataSets[] = [];
  lineChart!: Chart;

  constructor(private chartDataService: ChartDataService, private router: Router) { }

  ngOnInit(): void {
    this.selectedCountryName = localStorage.getItem('selectedCountry') ?? '';
    this.listenToFilteredDataListForChart();
    this.createChart();
    this.showOrHideLineInChart();
    this.lineChart.render();
  }

  createChart() {
    this.lineChart = new Chart('lineChart', {
      type: this.lineChartType,
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData
      },
      options: this.lineChartOptions
    });
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

      localStorage.setItem('chartList', JSON.stringify(this.dataFilteredByDropDownLists));
      this.mapListIntoChartDataSets();
    });
  }

  mapListIntoChartDataSets() {
    let chartMappedList = [];

    if (this.dataFilteredByDropDownLists.length > 0) {
      let list = this.dataFilteredByDropDownLists.map(obj => {
        return ({ data: { x: obj.month, y: obj.lessons, id: obj.school }, label: obj.school });
      });

      chartMappedList.push({ data: [list[0].data], label: list[0].label, hidden: false });
      for (let i = 1; i < list.length; i++) {
        let index = chartMappedList.findIndex(l => l?.label == list[i].label);
        if (index >= 0 && index != undefined) {
          chartMappedList[index]?.data.push(list[i].data);
        }
        else
          chartMappedList.push({ data: [list[i].data], label: list[i].label, hidden: false });
      }
      this.lineChartData = chartMappedList;
    }
    else this.lineChartData = [];

    this.createChart();
  }

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true,
    responsiveAnimationDuration: 500,
    tooltips: {
      enabled: false,
      // intersect: true,
    },
    title: {
      text: this.selectedCountryName
    },
    elements: {
      rectangle: {
        backgroundColor: 'blue'
      }
    },
    plugins: {
      datalabels: {
        display: (context: any) => {
          return context.chart.isDatasetVisible(context.datasetIndex);
        },
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }]
    }
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
    let activatedPoints: any = this.lineChart.getElementAtEvent($event);
    let clickedPoint = activatedPoints[0];
    let labelOfClickedPoint: any;
    if (clickedPoint) {
      // if (this.lineChart.data.labels != undefined)
      //   var label = this.lineChart.data.labels[clickedPoint._index];
      if (this.lineChart.data.datasets != undefined) {
        if (this.lineChart.data.datasets[clickedPoint?._datasetIndex] != undefined) {
          let pointWithLabel = this.lineChart.data.datasets[clickedPoint._datasetIndex];
          if (pointWithLabel.data != undefined)
            labelOfClickedPoint = pointWithLabel.data[clickedPoint._index];
       
            this.chartDataService.pointInLineClickedInChart.emit({ label: pointWithLabel.label, x: labelOfClickedPoint.x, y: labelOfClickedPoint.y });
            this.router.navigateByUrl('chartPointDetails');
          }
      }
    }
  };


  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeCanvasColor() {
    // this.lineChartOptions.elements.rectangle.backgroundColor = 'red';
    this.lineChart.update();
  }

  // updateChart(){
  //   Chart.helpers.each(Chart.instances, function(instance){
  //     instance.chart.update();
  //   });
  // }

  showOrHideLineInChart() {
    this.chartDataService.labelToHideOrToShow.subscribe((res: string) => {
      let choosenLabelIndex = this.lineChartData.findIndex(d => d.label == res);
      if (this.lineChartData[choosenLabelIndex].hidden == false) {
        this.lineChartData[choosenLabelIndex] = {
          data: this.lineChartData[choosenLabelIndex].data,
          label: this.lineChartData[choosenLabelIndex].label,
          hidden: true
        }
      }
      else {
        this.lineChartData[choosenLabelIndex] = {
          data: this.lineChartData[choosenLabelIndex].data,
          label: this.lineChartData[choosenLabelIndex].label,
          hidden: false
        }
      }
      this.lineChart.update();
      this.lineChart.render();
    })

  }
}