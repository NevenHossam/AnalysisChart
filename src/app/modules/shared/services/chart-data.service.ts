import { EventEmitter, Injectable, Output } from '@angular/core';
import { ChartObject } from '../models/chartObject';
import { ChartSummary } from '../models/chartSummary';
import { DropDownList } from '../models/dropDownList';
import chartData from '../data/data.json';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  allData: ChartObject[] = chartData;
  @Output() dropDownListChangedData: EventEmitter<DropDownList> = new EventEmitter();
  @Output() chartList: EventEmitter<ChartObject[]> = new EventEmitter();
  @Output() labelToHideOrToShow = new EventEmitter();
  @Output() chartSummary: EventEmitter<ChartSummary> = new EventEmitter();
  @Output() pointInLineClickedInChart = new EventEmitter();

  constructor() { }

  getAllCountries() {
    this.addChartListToLocalStorage(this.allData);
    return [...new Set(this.allData.map(chartObj => chartObj.country))];
  }

  getAllCampsOfCountry(country: string) {
    let filteredList = this.allData.filter(function (chartObj) { return chartObj.country == country });
    this.addChartListToLocalStorage(filteredList);
    return [...new Set(filteredList.map(chartObj => chartObj.camp))];
  }

  getAllSchoolsOfCamp(camp: string) {
    let selectedCountry = localStorage.getItem('selectedCountry');
    let filteredList = this.allData.filter(function (chartObj) { return chartObj.camp == camp && chartObj.country == selectedCountry });
    this.addChartListToLocalStorage(filteredList);
    return [...new Set(filteredList.map(chartObj => chartObj.school))];
  }

  //-----------------------------------------------

  getFilteredObjectsFromData(country: string, camp: string, school: string) {
    let chartList: ChartObject[] = [];
    if (school == 'Show All') {
      chartList = this.allData.filter(function (chartObj) {
        return chartObj.country == country && chartObj.camp == camp
      });
    }
    else {
      chartList = this.allData.filter(function (chartObj) {
        return chartObj.country == country && chartObj.camp == camp && chartObj.school == school
      });
    }
    this.addChartListToLocalStorage(chartList);
    return chartList;
  }

  addChartListToLocalStorage(chartList: ChartObject[]) {
    localStorage.removeItem('chartList');
    localStorage.setItem('chartList', JSON.stringify(chartList));
  }

  getChartListFromLocalStorage() {
    let jsonObj = localStorage.getItem('chartList');
    return JSON.parse(jsonObj ?? '');
  }

  getChartDataListSummary(dataFilteredByDropDownLists: ChartObject[]) {
    let ChartSummary: ChartSummary = {
      schoolWithLesson: [],
      selectedCamp: localStorage.getItem('selectedCamp') ?? '',
      totalNumberOfLessons: 0
    };

    if (dataFilteredByDropDownLists.length > 0) {
      ChartSummary?.schoolWithLesson?.push({
        schoolName: dataFilteredByDropDownLists[0].school,
        totalLessonsNumberOfThisSchool: dataFilteredByDropDownLists[0].lessons
      });
      ChartSummary.totalNumberOfLessons = dataFilteredByDropDownLists[0].lessons;

      for (let i = 1; i < dataFilteredByDropDownLists.length; i++) {
        ChartSummary.totalNumberOfLessons += dataFilteredByDropDownLists[i].lessons;
        let index = ChartSummary.schoolWithLesson?.findIndex(l => l?.schoolName == dataFilteredByDropDownLists[i].school);
        if (index != undefined)
          if (index >= 0) {
            ChartSummary.schoolWithLesson[index].totalLessonsNumberOfThisSchool += dataFilteredByDropDownLists[i].lessons;
          }
          else
            ChartSummary.schoolWithLesson.push({
              schoolName: dataFilteredByDropDownLists[i].school,
              totalLessonsNumberOfThisSchool: dataFilteredByDropDownLists[i].lessons
            });
      }
    }

    this.chartSummary.emit(ChartSummary);
  }
}
