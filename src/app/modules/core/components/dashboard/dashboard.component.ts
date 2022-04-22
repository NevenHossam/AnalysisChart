import { Component, OnInit } from '@angular/core';
import { DropDownListTypesEnum } from 'src/app/modules/shared/enums/dropDownListType';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { ChartObject } from '../../models/chartObject';
import { DropDownList } from '../../models/dropDownList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //props
  countriesDropDownList: DropDownList = { dropDownTypeToBeReflectedOn: DropDownListTypesEnum.CountriesDropDown, dropDownListData: [], listOfDataObjects: [] };
  campsDropDownList: DropDownList = { dropDownTypeToBeReflectedOn: DropDownListTypesEnum.CampsDropDown, dropDownListData: [], listOfDataObjects: [] };
  schoolsDropDownList: DropDownList = { dropDownTypeToBeReflectedOn: DropDownListTypesEnum.SchoolsDropDown, dropDownListData: [], listOfDataObjects: [] };

  dataFilteredByDropDownLists: ChartObject[] = [];

  selectedCountry: string = '';
  selectedCamp: string = '';
  selectedSchool: string = '';

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.initializeDashBoard();
    this.listenToDDLChanges();
  }

  initializeDashBoard() {
    this.getAllCountries();

    if (this.countriesDropDownList.dropDownListData != undefined)
      this.selectedCountry = this.countriesDropDownList?.dropDownListData[0] ?? '';
    let campsResult = this.chartDataService.getAllCampsOfCountry(this.selectedCountry, this.countriesDropDownList.listOfDataObjects);
    this.campsDropDownList.dropDownListData = campsResult.dropDownListData;
    this.campsDropDownList.listOfDataObjects = campsResult.listOfDataObjects;

    if (this.campsDropDownList.dropDownListData != undefined)
      this.selectedCamp = this.campsDropDownList?.dropDownListData[0] ?? '';

      let schoolsResult = this.chartDataService.getAllSchoolsOfCamp(this.selectedCamp, this.campsDropDownList.listOfDataObjects);
      this.schoolsDropDownList.dropDownListData = schoolsResult.dropDownListData;
      this.schoolsDropDownList.listOfDataObjects = schoolsResult.listOfDataObjects;

    if (this.schoolsDropDownList.dropDownListData != undefined)
      this.selectedSchool = this.schoolsDropDownList?.dropDownListData[0] ?? '';

    this.dataFilteredByDropDownLists = this.chartDataService.getFilteredObjectsFromData(this.selectedCountry, this.selectedCamp, this.selectedSchool);
    this.chartDataService.chartList.emit(this.dataFilteredByDropDownLists);
  }

  listenToDDLChanges() {
    this.chartDataService.dropDownListChangedData.subscribe((res: DropDownList) => {
      if (res != undefined) {
        switch (res.dropDownTypeToBeReflectedOn) {
          case DropDownListTypesEnum.CampsDropDown:
            this.setCampsForSelectedCountry(res.dropDownListData ?? []);

            let firstCamp = res.dropDownListData != undefined ? res.dropDownListData[0] : '';
            let schoolsResult = this.chartDataService.getAllSchoolsOfCamp(firstCamp, this.campsDropDownList.listOfDataObjects);
            this.schoolsDropDownList.dropDownListData = schoolsResult.dropDownListData;
            this.schoolsDropDownList.listOfDataObjects = schoolsResult.listOfDataObjects;
            break;
          case DropDownListTypesEnum.SchoolsDropDown:
            this.setSchoolsForSelectedCamp(res.dropDownListData ?? []);
            break;
        }

        switch (res.dropDownTypeOfChangedDDL) {
          case DropDownListTypesEnum.CountriesDropDown:
            this.selectedCountry = res.selectedValue ?? '';
            break;
          case DropDownListTypesEnum.CampsDropDown:
            this.selectedCamp = res.selectedValue ?? '';
            break;
          case DropDownListTypesEnum.SchoolsDropDown:
            this.selectedSchool = res.selectedValue ?? '';
            break;
        }

        this.dataFilteredByDropDownLists = this.chartDataService.getFilteredObjectsFromData(this.selectedCountry, this.selectedCamp, this.selectedSchool);
        this.chartDataService.chartList.emit(this.dataFilteredByDropDownLists);
      }
    }, (err) => {

    });
  }

  getAllCountries() {
    let countriesResult = this.chartDataService.getAllCountries();
    this.countriesDropDownList.dropDownListData = countriesResult.dropDownListData;
    this.countriesDropDownList.listOfDataObjects = countriesResult.listOfDataObjects;
  }

  setCampsForSelectedCountry(campsList: string[]) {
    this.campsDropDownList.dropDownListData = campsList;
  }

  setSchoolsForSelectedCamp(schoolsList: string[]) {
    this.schoolsDropDownList.dropDownListData = schoolsList;
  }
}
