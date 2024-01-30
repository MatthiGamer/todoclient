import { DateType } from "../Types/DateType";

export const GetDateTypeFromDate = (date: Date): DateType => {
    const dateType: DateType = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    };

    return dateType;
}