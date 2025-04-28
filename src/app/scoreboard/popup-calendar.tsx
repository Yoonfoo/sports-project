import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay
} from 'date-fns';
import React from 'react';
import { useState, useMemo } from 'react';

interface CalendarProps {
    setDate: (date: Date) => void;
    date: Date;
}

export default function PopupCalendar({setDate, date}:CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const nextMonth = () : void => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () : void => setCurrentMonth(subMonths(currentMonth, 1));

    const renderHeader = () => (
        <div className="flex justify-between items-center p-2">
            <div className="w-8 h-8 cursor-pointer hover:bg-blue-300 rounded-full" onClick={prevMonth}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>
            </div>
            <span>{format(currentMonth, 'MMMM yyyy')}</span>
            <div className="w-8 h-8 cursor-pointer hover:bg-blue-300 rounded-full" onClick={nextMonth}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>
            </div>
        </div>
    )

    const renderDays = () => {
        const days: React.JSX.Element[] = [];
        const startDate = startOfWeek(currentMonth);

        for(let i = 0; i < 7; i++) {
            days.push(
                <div className="flex w-10 h-12 justify-center items-center text-center" key={i}>
                    {format(addDays(startDate, i), 'EEE')}
                </div>
            )
        }
        return <div className="flex">{days}</div>
    }

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows: React.JSX.Element[] = [];
        let days: React.JSX.Element[] = [];
        let day = startDate;

        while (day <= endDate) {
            for(let i = 0; i < 7;i++) {
                const formattedDate = format(day, 'd');
                const cloneDay = day;

                days.push(
                    <div key={cloneDay.toString()}
                        className={`w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:rounded-full
                            ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''}
                            ${isSameDay(day, date) ? 'bg-blue-500 text-white rounded-full' : ''}`}
                        onClick={() => {
                            setSelectedDate(cloneDay);
                            setDate(cloneDay);
                        }}
                        >
                        {formattedDate}
                    </div>
                )
                
                day = addDays(day, 1);
            }

            rows.push(
                <div className="flex justify-center" key={day.toString()}>
                    {days}
                </div>
            );

            days = [];
        }

        return <div className="bg-slate-300 rounded-lg">{rows}</div>
    }

    const header = useMemo(() => renderHeader(), [currentMonth]);
    const days = useMemo(() => renderDays(), [currentMonth]);
    const cells = useMemo(() => renderCells(), [currentMonth, selectedDate]);

    return (
        <div className="w-80 h-max p-4 shadow-2xl rounded-lg bg-slate-200 border-2">
            {header}
            {days}
            {cells}
        </div>
    )

}
