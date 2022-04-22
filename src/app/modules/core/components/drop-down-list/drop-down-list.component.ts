import { Component, Input, OnInit } from '@angular/core';
import { DropDownListTypesEnum } from 'src/app/modules/shared/enums/dropDownListType';
import { ChartDataService } from 'src/app/modules/shared/services/chart-data.service';
import { DropDownList } from '../../models/dropDownList';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.css']
})
export class DropDownListComponent implements OnInit {
  //props
  @Input() dropDownList: DropDownList = { listOfDataObjects: [] };

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
  }

  dropDownChanged(dropDownListChangedValue: any) {
    switch (this.dropDownList.dropDownTypeToBeReflectedOn) {
      case DropDownListTypesEnum.CountriesDropDown:
        this.getCampsForSelectedCountry(dropDownListChangedValue.value);
        break;
      case DropDownListTypesEnum.CampsDropDown:
        this.getSchoolsForSelectedCamp(dropDownListChangedValue.value);
        break;
      case DropDownListTypesEnum.SchoolsDropDown:
        this.schooleChanged(dropDownListChangedValue.value);
        break;
    }
  }

  getCampsForSelectedCountry(selectedCountry: string) {
    let campsList: DropDownList = { listOfDataObjects: [] };
    let chartFilteredList = this.chartDataService.getChartListFromLocalStorage();
    campsList.dropDownListData = this.chartDataService.getAllCampsOfCountry(selectedCountry);
    campsList.dropDownTypeOfChangedDDL = DropDownListTypesEnum.CountriesDropDown;
    campsList.dropDownTypeToBeReflectedOn = DropDownListTypesEnum.CampsDropDown;
    campsList.selectedValue = selectedCountry;
    this.chartDataService.dropDownListChangedData.emit(campsList);
  }

  getSchoolsForSelectedCamp(selectedCamp: string) {
    let chartFilteredList = this.chartDataService.getChartListFromLocalStorage();
    let schoolsList: DropDownList = { listOfDataObjects: [] };
    schoolsList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(selectedCamp);
    schoolsList.dropDownTypeOfChangedDDL = DropDownListTypesEnum.CampsDropDown;
    schoolsList.dropDownTypeToBeReflectedOn = DropDownListTypesEnum.SchoolsDropDown;
    schoolsList.selectedValue = selectedCamp;
    this.chartDataService.dropDownListChangedData.emit(schoolsList);
  }

  schooleChanged(selectedSchool: string) {
    let list: DropDownList = { listOfDataObjects: [] };
    list.dropDownTypeOfChangedDDL = DropDownListTypesEnum.SchoolsDropDown;
    list.selectedValue = selectedSchool;
    this.chartDataService.dropDownListChangedData.emit(list);
  }
}
