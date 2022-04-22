import { Component, OnInit } from '@angular/core';
import { DropDownListTypesEnum } from 'src/app/modules/shared/enums/dropDownListType';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { DropDownList } from '../../models/dropDownList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //props
  countriesDropDownList: DropDownList = { dropDownListType: DropDownListTypesEnum.CountriesDropDown, dropDownListData: [] };
  campsDropDownList: DropDownList = { dropDownListType: DropDownListTypesEnum.CampsDropDown, dropDownListData: [] };
  schoolsDropDownList: DropDownList = { dropDownListType: DropDownListTypesEnum.SchoolsDropDown, dropDownListData: [] };

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
    this.initializeDashBoard();
    this.listenToDDLChanges();
  }

  initializeDashBoard() {
    this.getAllCountries();

    let firstCountry: string = '';
    let firstCamp: string = '';
    if (this.countriesDropDownList.dropDownListData != undefined)
      firstCountry = this.countriesDropDownList?.dropDownListData[0] ?? '';

    this.campsDropDownList.dropDownListData = this.chartDataService.getAllCampsOfCountry(firstCountry);

    if (this.campsDropDownList.dropDownListData != undefined)
      firstCamp = this.campsDropDownList?.dropDownListData[0] ?? '';

    this.schoolsDropDownList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(firstCamp);
  }

  listenToDDLChanges() {
    this.chartDataService.dropDownListChangedData.subscribe((res: DropDownList) => {
      if (res != undefined) {
        switch (res.dropDownListType) {
          case DropDownListTypesEnum.CampsDropDown:
            this.setCampsForSelectedCountry(res.dropDownListData ?? []);
            
            let firstCamp = res.dropDownListData != undefined ? res.dropDownListData[0] : '';
            this.schoolsDropDownList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(firstCamp);
            break;
          case DropDownListTypesEnum.SchoolsDropDown:
            this.setSchoolsForSelectedCamp(res.dropDownListData ?? []);
            break;
        }
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
