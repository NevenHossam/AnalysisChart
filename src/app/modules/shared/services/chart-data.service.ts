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
    return { dropDownListData: [...new Set(this.allData.map(chartObj => chartObj.country))], listOfDataObjects: this.allData };
  }

  getAllCampsOfCountry(country: string, dataListToSearchIn: ChartObject[]) {
    let filteredList = dataListToSearchIn.filter(function (chartObj) { return chartObj.country == country });
    this.addChartListToLocalStorage(filteredList);
    return { dropDownListData: [...new Set(filteredList.map(chartObj => chartObj.camp))], listOfDataObjects: filteredList };
  }

  getAllSchoolsOfCamp(camp: string, dataListToSearchIn: ChartObject[]) {
    let filteredList = dataListToSearchIn.filter(function (chartObj) { return chartObj.camp == camp });
    this.addChartListToLocalStorage(filteredList);
    return { dropDownListData: [...new Set(filteredList.map(chartObj => chartObj.school))], listOfDataObjects: filteredList };
  }

  //-----------------------------------------------

  getFilteredObjectsFromData(country: string, camp: string, school: string) {
    let chartList = this.allData.filter(function (chartObj) {
      return chartObj.country == country && chartObj.camp == camp && chartObj.school == school
    });
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
