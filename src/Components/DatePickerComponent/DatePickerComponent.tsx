import React, { ChangeEvent, useRef } from "react";
import "./DatePickerComponent.css";

interface DatePickerComponentProps {
    OnChange: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {

    const dateInputRef = useRef<HTMLInputElement>(null)

    const HandleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.OnChange(event.target.valueAsDate);
    }

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
            <input id="DateInput" type="date" min={today} ref={dateInputRef} onChange={HandleOnChange}/>
        </div>
    )
}

export default DatePickerComponent;