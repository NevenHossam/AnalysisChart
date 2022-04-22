import { EventEmitter, Injectable, Output } from '@angular/core';
import { ChartObject } from '../../core/models/chartObject';
import { DropDownList } from '../../core/models/dropDownList';
import chartData from '../data/data.json';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  allData: ChartObject[] = chartData;
  @Output() dropDownListChangedData: EventEmitter<DropDownList> = new EventEmitter();

  constructor() { }

  getAllCountries() {
    return [...new Set(this.allData.map(chartObj => chartObj.country))];
  }

  getAllCampsOfCountry(country: string) {
    let filteredList = this.allData.filter(function (chartObj) { return chartObj.country.toLowerCase() == country.toLowerCase() });
    return [...new Set(filteredList.map(chartObj => chartObj.camp))];
  }

  getAllSchoolsOfCamp(camp: string) {
    let filteredList = this.allData.filter(function (chartObj) { return chartObj.camp.toLowerCase() == camp.toLowerCase() });
    return [...new Set(filteredList.map(chartObj => chartObj.school))];
  }

  //-----------------------------------------------



}
