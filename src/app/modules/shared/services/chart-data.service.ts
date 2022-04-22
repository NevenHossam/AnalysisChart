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
    return [...new Set(this.allData.map(chartObj => chartObj.country))];
  }

  getAllCampsOfCountry(country: string) {
    let filteredList = this.allData.filter(function (chartObj) { return chartObj.country == country });
    return [...new Set(filteredList.map(chartObj => chartObj.camp))];
  }

  getAllSchoolsOfCamp(camp: string) {
    let filteredList = this.allData.filter(function (chartObj) { return chartObj.camp == camp });
    return [...new Set(filteredList.map(chartObj => chartObj.school))];
  }

  //-----------------------------------------------

  getFilteredObjectsFromData(country: string, camp: string, school: string) {
    let chartList = this.allData.filter(function (chartObj) {
      return chartObj.country == country && chartObj.camp == camp && chartObj.school == school
    });
    localStorage.setItem('chartList', JSON.stringify(chartList));
    return chartList;
  }

  // getFilteredObjectsFromDataWithSpecificChangedType(changedValue: string, dropDownListType: DropDownListTypesEnum) {
  //   let chartList: ChartObject[] = [];
  //   chartList = localStorage.getItem('chartList') != null ? localStorage.getItem('chartList') : [];

  //   switch (dropDownListType) {
  //     case DropDownListTypesEnum.CountriesDropDown:
  //       chartList.filter(function (chartObj) {
  //         return chartObj.country == country && chartObj.camp == camp && chartObj.school == school
  //       });
  //       break;
  //     case DropDownListTypesEnum.CampsDropDown:
  //       chartList.filter(function (chartObj) {
  //         return chartObj.country == country && chartObj.camp == camp && chartObj.school == school
  //       });
  //       break;
  //     case DropDownListTypesEnum.SchoolsDropDown:
  //       chartList.filter(function (chartObj) {
  //         return chartObj.country == country && chartObj.camp == camp && chartObj.school == school
  //       });
  //       break;
  //   }

  //   return chartList;
  // }
}
