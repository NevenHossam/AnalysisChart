import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { DropDownListTypesEnum } from 'src/app/modules/shared/enums/dropDownListType';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { ChartObject } from '../../models/chartObject';
import { ChartSummary } from '../../models/chartSummary';
import { DropDownList } from '../../models/dropDownList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentChecked {
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

    window.setTimeout(() => {
      this.chartDataService.chartList.emit(this.dataFilteredByDropDownLists);
      this.chartDataService.getChartDataListSummary(this.dataFilteredByDropDownLists);
    }, 100);
  }

  ngAfterContentChecked(): void {

  }

  initializeDashBoard() {
    this.getAllCountries();

    this.selectedCountry = localStorage.getItem('selectedCountry') ?? '';
    if (this.selectedCountry == '') {
      if (this.countriesDropDownList.dropDownListData != undefined)
        this.selectedCountry = this.countriesDropDownList?.dropDownListData[0] ?? '';
      localStorage.setItem('selectedCountry', this.selectedCountry);
    }
    this.campsDropDownList.dropDownListData = this.chartDataService.getAllCampsOfCountry(this.selectedCountry);

    this.selectedCamp = localStorage.getItem('selectedCamp') ?? '';
    if (this.selectedCamp == '') {
      if (this.campsDropDownList.dropDownListData != undefined)
        this.selectedCamp = this.campsDropDownList?.dropDownListData[0] ?? '';
      localStorage.setItem('selectedCamp', this.selectedCamp);
    }
    this.schoolsDropDownList.dropDownListData = [];
    this.schoolsDropDownList.dropDownListData.push('Show All');
    this.schoolsDropDownList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(this.selectedCamp);

    this.selectedSchool = localStorage.getItem('selectedSchool') ?? '';
    if (this.selectedSchool == '') {
      if (this.schoolsDropDownList.dropDownListData != undefined)
        this.selectedSchool = this.schoolsDropDownList?.dropDownListData[0] ?? '';
      localStorage.setItem('selectedSchool', this.selectedSchool);
    }

    this.dataFilteredByDropDownLists = this.chartDataService.getFilteredObjectsFromData(this.selectedCountry, this.selectedCamp, this.selectedSchool);
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
        this.chartDataService.getChartDataListSummary(this.dataFilteredByDropDownLists);
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
    this.schoolsDropDownList.dropDownListData = [];
    this.schoolsDropDownList.dropDownListData.push('Show All');
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
