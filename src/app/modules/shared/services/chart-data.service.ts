import { EventEmitter, Injectable, Output } from '@angular/core';
import { ChartObject } from '../../core/models/chartObject';
import { DropDownList } from '../../core/models/dropDownList';
import chartData from '../data/data.json';
import { DropDownListTypesEnum } from '../enums/dropDownListType';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  allData: ChartObject[] = chartData;
  @Output() dropDownListChangedData: EventEmitter<DropDownList> = new EventEmitter();
  @Output() chartList: EventEmitter<ChartObject[]> = new EventEmitter();

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
}
