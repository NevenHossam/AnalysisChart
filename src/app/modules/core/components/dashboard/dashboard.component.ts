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
  countriesDropDownList: DropDownList = { dropDownTypeToBeReflectedOn: DropDownListTypesEnum.CountriesDropDown, dropDownListData: [] };
  campsDropDownList: DropDownList = { dropDownTypeToBeReflectedOn: DropDownListTypesEnum.CampsDropDown, dropDownListData: [] };
  schoolsDropDownList: DropDownList = { dropDownTypeToBeReflectedOn: DropDownListTypesEnum.SchoolsDropDown, dropDownListData: [] };

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

    this.campsDropDownList.dropDownListData = this.chartDataService.getAllCampsOfCountry(this.selectedCountry);

    if (this.campsDropDownList.dropDownListData != undefined)
      this.selectedCamp = this.campsDropDownList?.dropDownListData[0] ?? '';

    this.schoolsDropDownList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(this.selectedCamp);

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
            this.schoolsDropDownList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(firstCamp);
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
    this.countriesDropDownList.dropDownListData = this.chartDataService.getAllCountries();
  }

  setCampsForSelectedCountry(campsList: string[]) {
    this.campsDropDownList.dropDownListData = campsList;
  }

  setSchoolsForSelectedCamp(schoolsList: string[]) {
    this.schoolsDropDownList.dropDownListData = schoolsList;
  }
}
