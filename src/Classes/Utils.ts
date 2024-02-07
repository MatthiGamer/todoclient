import { DateType } from "../Types/DateType";

export const GetDateTypeFromDate = (date: Date): DateType => {
    const dateType: DateType = {
        day: date.getDate(),
        month: date.getMonth() + 1, // getMonth() => January is 0 => getMonth() + 1
        year: date.getFullYear()
    };

    return dateType;
}

export const IsSameDate = (dateToTest: DateType | null | undefined, date: DateType | null | undefined): boolean => {
    if (!dateToTest && !date) return true;
    if (!dateToTest || !date) return false;

    return (
        dateToTest.day === date.day &&
        dateToTest.month === date.month &&
        dateToTest.year === date.year
    )
}