import { DropDownListTypesEnum } from "../enums/dropDownListType";
import { ChartObject } from "./chartObject";

export interface DropDownList {
    dropDownTypeOfChangedDDL?: DropDownListTypesEnum,
    dropDownTypeToBeReflectedOn?: DropDownListTypesEnum,
    dropDownListData?: string[]
    selectedValue?: string,
}