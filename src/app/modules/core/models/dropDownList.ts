import { DropDownListTypesEnum } from "../../shared/enums/dropDownListType";

export interface DropDownList {
    dropDownListType?: DropDownListTypesEnum,
    dropDownListData?: string[]
}