import { DateType } from "../Types/DateType";

export const GetDateTypeFromDate = (date: Date): DateType => {
    const dateType: DateType = {
        day: date.getDate(),
        month: date.getMonth() + 1, // getMonth() => January is 0 => getMonth() + 1
        year: date.getFullYear()
    };

    return dateType;
}