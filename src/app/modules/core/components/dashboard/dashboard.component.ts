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
    localStorage.setItem('selectedCountry', this.selectedCountry);
    this.campsDropDownList.dropDownListData = this.chartDataService.getAllCampsOfCountry(this.selectedCountry);

    if (this.campsDropDownList.dropDownListData != undefined)
      this.selectedCamp = this.campsDropDownList?.dropDownListData[0] ?? '';
    localStorage.setItem('selectedCamp', this.selectedCamp);
    this.schoolsDropDownList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(this.selectedCamp);

    if (this.schoolsDropDownList.dropDownListData != undefined)
      this.selectedSchool = this.schoolsDropDownList?.dropDownListData[0] ?? '';
    localStorage.setItem('selectedSchool', this.selectedSchool);

    this.dataFilteredByDropDownLists = this.chartDataService.getFilteredObjectsFromData(this.selectedCountry, this.selectedCamp, this.selectedSchool);

    // this.dataFilteredByDropDownLists = this.chartDataService.getChartListFromLocalStorage();
    this.chartDataService.chartList.emit(this.dataFilteredByDropDownLists);
  }

  listenToDDLChanges() {
    this.chartDataService.dropDownListChangedData.subscribe((res: DropDownList) => {
      if (res != undefined) {
        switch (res.dropDownTypeOfChangedDDL) {
          case DropDownListTypesEnum.CountriesDropDown:
            this.countryChanged(res.selectedValue ?? '', res.dropDownListData ?? []);
            break;
          case DropDownListTypesEnum.CampsDropDown:
            this.campChanged(res.selectedValue ?? '', res.dropDownListData ?? []);
            break;
          case DropDownListTypesEnum.SchoolsDropDown:
            this.schoolChanged(res.selectedValue ?? '');
            break;
        }

        this.dataFilteredByDropDownLists = this.chartDataService.getFilteredObjectsFromData(this.selectedCountry, this.selectedCamp, this.selectedSchool);
        this.chartDataService.chartList.emit(this.dataFilteredByDropDownLists);
      }
    }, (err) => {

    });
  }

  countryChanged(selectedCountry: string, campsDataList: string[]) {
    this.selectedCountry = selectedCountry ?? '';
    localStorage.setItem('selectedCountry', this.selectedCountry);

    this.campsDropDownList.dropDownListData = campsDataList;
    this.selectedCamp = campsDataList != undefined ? campsDataList[0] : '';
    localStorage.setItem('selectedCamp', this.selectedCamp);

    this.changeSchoolsListBasedOnCampsValue();
  }

  campChanged(selectedCamp: string, schoolsDataList: string[]) {
    this.selectedCamp = selectedCamp ?? '';
    localStorage.setItem('selectedCamp', this.selectedCamp);
    this.schoolsDropDownList.dropDownListData = schoolsDataList;

    this.changeSchoolsListBasedOnCampsValue();
  }

  schoolChanged(selectedSchool: string) {
    this.selectedSchool = selectedSchool ?? '';
    localStorage.setItem('selectedSchool', this.selectedSchool);
  }


  changeSchoolsListBasedOnCampsValue() {
    this.schoolsDropDownList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(this.selectedCamp);
    this.selectedSchool = this.schoolsDropDownList.dropDownListData[0] ?? '';
    localStorage.setItem('selectedSchool', this.selectedSchool);
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
