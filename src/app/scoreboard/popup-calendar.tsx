'use client'

import React, { useState } from 'react';
import { eachDayOfInterval } from 'date-fns';

interface PopupCalendarProps {
    setSelectedDate: (date: string) => void;

}

const PopupCalendar: React.FC<PopupCalendarProps> = ({ setSelectedDate }) => {

    const [selectedYear] = useState<string>(new Date().getFullYear().toString());
    const [selectedMonth] = useState<string>((new Date().getMonth()+1).toString());

    const generateCalendarDays = (year:number, month:number) => {
        const monthInterval = eachDayOfInterval({
            start: new Date(year, month-1),
            end: new Date(year, month, 0)
        })

        while(monthInterval[0].getDay() != 0){
            monthInterval.unshift(new Date(
                monthInterval[0].getFullYear(), 
                monthInterval[0].getMonth(), 
                monthInterval[0].getDate() - 1
            ))    
        }

        while(monthInterval[monthInterval.length-1].getDay() != 6){
            monthInterval.push(new Date(
                monthInterval[monthInterval.length-1].getFullYear(), 
                monthInterval[monthInterval.length-1].getMonth(), 
                monthInterval[monthInterval.length-1].getDate() + 1
            ))
        }

        return monthInterval
    }

    const handleDateSelect = (day: string) => {
        const date = `${selectedMonth}/${day.padStart(2,'0')}/${selectedYear} 00:00:00`;
        setSelectedDate(date)
    }

    const currentMonthInterval = generateCalendarDays(new Date().getFullYear(), new Date().getMonth() + 1)
    const firstWeek = currentMonthInterval.slice(0, 7)
    const secondWeek = currentMonthInterval.slice(7, 14)
    const thirdWeek = currentMonthInterval.slice(14, 21)
    const fourthWeek = currentMonthInterval.slice(21, 28)
    const fifthWeek = currentMonthInterval.slice(28, 35)

    return (
        <div className="p-12 rounded-3xl shadow-2xl bg-gray-200">
            <div className="flex justify-center">
                <input type='text' placeholder='ex: 2024-3-12' className='py-2 w-4/5 border-black border-2'></input>
            </div>
            <div className="flex flex-row justify-center">
                <div className="p-4 w-16 h-16">SUN</div>
                <div className="p-4 w-16 h-16">MON</div>
                <div className="p-4 w-16 h-16">TUE</div>
                <div className="p-4 w-16 h-16">WED</div>
                <div className="p-4 w-16 h-16">THU</div>
                <div className="p-4 w-16 h-16">FRI</div>
                <div className="p-4 w-16 h-16">SAT</div>
            </div>
            <div className="flex flex-row justify-center">
                {firstWeek.map((date, index) => (
                    <button key={index} className="p-4 w-16 h-16 border hover:bg-black hover:text-white" onClick={()=>handleDateSelect(date.getDate().toString())}>
                        {date.getDate()}
                    </button>
                ))}
            </div>
            <div className="flex flex-row justify-center">
                {secondWeek.map((date, index) => (
                    <button key={index} className="p-4 w-16 h-16 border hover:bg-black hover:text-white" onClick={()=>handleDateSelect(date.getDate().toString())}>
                        {date.getDate()}
                    </button>
                ))}
            </div>
            <div className="flex flex-row justify-center">
                {thirdWeek.map((date, index) => (
                    <button key={index} className="p-4 w-16 h-16 border hover:bg-black hover:text-white" onClick={()=>handleDateSelect(date.getDate().toString())}>
                        {date.getDate()}
                    </button>
                ))}
            </div>
            <div className="flex flex-row justify-center">
                {fourthWeek.map((date, index) => (
                    <button key={index} className="p-4 w-16 h-16 border hover:bg-black hover:text-white" onClick={()=>handleDateSelect(date.getDate().toString())}>
                        {date.getDate()}
                    </button>
                ))}
            </div>
            <div className="flex flex-row justify-center">
                {fifthWeek.map((date, index) => (
                    <button key={index} className="p-4 w-16 h-16 border hover:bg-black hover:text-white" onClick={()=>handleDateSelect(date.getDate().toString())}>
                        {date.getDate()}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PopupCalendar;
