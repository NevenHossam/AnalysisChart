import { DropDownListTypesEnum } from "../../shared/enums/dropDownListType";

export interface DropDownList {
    dropDownTypeOfChangedDDL?: DropDownListTypesEnum,
    dropDownTypeToBeReflectedOn?: DropDownListTypesEnum,
    dropDownListData?: string[]
    selectedValue?: string,
}