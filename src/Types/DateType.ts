export type DateType = {
    day: number;
    month: number;
    year: number;
}

export const DateTypeString = (date: DateType | null | undefined): string => {
    return date === null || date == undefined ? "No due date" : `${date.month}/${date.day}/${date.year}`;
}