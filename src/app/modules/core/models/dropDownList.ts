import { DropDownListTypesEnum } from "../../shared/enums/dropDownListType";
import { ChartObject } from "./chartObject";

export interface DropDownList {
    dropDownTypeOfChangedDDL?: DropDownListTypesEnum,
    dropDownTypeToBeReflectedOn?: DropDownListTypesEnum,
    dropDownListData?: string[]
    listOfDataObjects: ChartObject[]
    selectedValue?: string,
}