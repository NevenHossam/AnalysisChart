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
  @Input() dropDownList: DropDownList = {};

  constructor(private chartDataService: ChartDataService) { }

  ngOnInit(): void {
  }

  dropDownChanged(dropDownListChangedValue: any) {
    switch (this.dropDownList.dropDownListType) {
      case DropDownListTypesEnum.CountriesDropDown:
        this.getCampsForSelectedCountry(dropDownListChangedValue.value);
        break;
      case DropDownListTypesEnum.CampsDropDown:
        this.getSchoolsForSelectedCamp(dropDownListChangedValue.value);
        break;
    }
  }

  getCampsForSelectedCountry(selectedCountry: string) {
    let campsList: DropDownList = {};
    campsList.dropDownListData = this.chartDataService.getAllCampsOfCountry(selectedCountry);
    campsList.dropDownListType = DropDownListTypesEnum.CampsDropDown;
    this.chartDataService.dropDownListChangedData.emit(campsList);
  }

  getSchoolsForSelectedCamp(selectedCamp: string) {
    let schoolsList: DropDownList = {};
    schoolsList.dropDownListData = this.chartDataService.getAllSchoolsOfCamp(selectedCamp);
    schoolsList.dropDownListType = DropDownListTypesEnum.SchoolsDropDown;
    this.chartDataService.dropDownListChangedData.emit(schoolsList);
  }
}
