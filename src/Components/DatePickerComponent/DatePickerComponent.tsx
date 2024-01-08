import React, { useRef } from "react";
import "./DatePickerComponent.css";

const DatePickerComponent: React.FC = () => {

    const dateInputRef = useRef<HTMLInputElement>(null)

    const MinDateString = (): string => {
        const date = new Date();
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${year}-${month}-${day}`;
    }

    const today = MinDateString();

    return (
        <div id="DatePickerContainer">
            <input id="DateInput" type="date" lang="en" min={today} ref={dateInputRef}/>
        </div>
    )
}

export default DatePickerComponent;